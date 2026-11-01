import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import * as d3 from 'd3'
import './CommitExplorerWindow.css'

const DATA_URL = '/meta/loc.csv'
const REPO_URL = 'https://github.com/Da0t/Portfolio-Website'
const TOOLTIP_OFFSET = 12
// Gives the pointer time to cross from a dot to the tooltip's commit link.
const TOOLTIP_HIDE_DELAY = 300

async function loadData() {
  return d3.csv(DATA_URL, row => ({
    ...row,
    line: Number(row.line),
    depth: Number(row.depth),
    length: Number(row.length),
    date: new Date(row.date + 'T00:00' + row.timezone),
    datetime: new Date(row.datetime),
  }))
}

function processCommits(data) {
  return d3.groups(data, d => d.commit).map(([commit, lines]) => {
    const { author, date, time, timezone, datetime } = lines[0]
    const ret = {
      id: commit,
      url: `${REPO_URL}/commit/${commit}`,
      author,
      date,
      time,
      timezone,
      datetime,
      hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
      totalLines: lines.length,
    }

    // Non-enumerable, so logging a commit doesn't dump thousands of rows.
    Object.defineProperty(ret, 'lines', {
      value: lines,
      enumerable: false,
      writable: false,
      configurable: false,
    })

    return ret
  })
}

function renderCommitInfo(container, data, commits) {
  const fileLengths = d3.rollups(data, v => d3.max(v, d => d.line), d => d.file)
  const linesByPeriod = d3.rollups(
    data,
    v => v.length,
    d => d.datetime.toLocaleString('en', { dayPeriod: 'short' }),
  )

  const stats = [
    ['Total LOC', data.length],
    ['Total commits', commits.length],
    ['Files', fileLengths.length],
    ['Longest file', `${d3.max(fileLengths, d => d[1])} lines`],
    ['Average line length', `${Math.round(d3.mean(data, d => d.length))} chars`],
    ['Busiest time of day', d3.greatest(linesByPeriod, d => d[1])?.[0]],
  ]

  const dl = d3.select(container).html('').append('dl').attr('class', 'stats')
  stats.forEach(([label, value]) => {
    dl.append('dt').text(label)
    dl.append('dd').text(value)
  })
}

function renderTooltipContent(tooltip, commit) {
  const link = tooltip.querySelector('#commit-link')
  link.href = commit.url
  link.textContent = commit.id
  tooltip.querySelector('#commit-date').textContent =
    commit.datetime?.toLocaleString('en', { dateStyle: 'full' })
  tooltip.querySelector('#commit-time').textContent =
    commit.datetime?.toLocaleString('en', { timeStyle: 'short' })
  tooltip.querySelector('#commit-author').textContent = commit.author
  tooltip.querySelector('#commit-lines').textContent = commit.totalLines
}

function updateTooltipVisibility(tooltip, isVisible) {
  tooltip.hidden = !isVisible
}

function updateTooltipPosition(tooltip, event) {
  const { width, height } = tooltip.getBoundingClientRect()
  // Flip at the viewport edges so the tooltip is never clipped.
  const left = event.clientX + TOOLTIP_OFFSET + width > window.innerWidth
    ? event.clientX - TOOLTIP_OFFSET - width
    : event.clientX + TOOLTIP_OFFSET
  const top = event.clientY + TOOLTIP_OFFSET + height > window.innerHeight
    ? event.clientY - TOOLTIP_OFFSET - height
    : event.clientY + TOOLTIP_OFFSET
  tooltip.style.left = `${Math.max(0, left)}px`
  tooltip.style.top = `${Math.max(0, top)}px`
}

function renderSelectionCount(element, selectedCommits) {
  const count = selectedCommits.length
  element.textContent = `${count || 'No'} commit${count === 1 ? '' : 's'} selected`
}

function renderLanguageBreakdown(container, selectedCommits) {
  const dl = d3.select(container).html('')
  if (selectedCommits.length === 0) return

  const lines = selectedCommits.flatMap(d => d.lines)
  const breakdown = d3.rollup(lines, v => v.length, d => d.type)
  const format = d3.format('.1~%')

  for (const [language, count] of d3.sort(breakdown, d => -d[1])) {
    dl.append('dt').text(language)
    dl.append('dd').text(`${count} lines (${format(count / lines.length)})`)
  }
}

function renderScatterPlot(chart, commits, { tooltip, selectionCount, languageBreakdown }) {
  const width = 1000
  const height = 600
  const margin = { top: 10, right: 30, bottom: 30, left: 44 }
  const usableArea = {
    top: margin.top,
    right: width - margin.right,
    bottom: height - margin.bottom,
    left: margin.left,
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
  }

  const xScale = d3.scaleTime()
    .domain(d3.extent(commits, d => d.datetime))
    .range([usableArea.left, usableArea.right])
    .nice()

  const yScale = d3.scaleLinear()
    .domain([0, 24])
    .range([usableArea.bottom, usableArea.top])

  // Square root: a dot's area, not its radius, tracks the lines edited.
  const [minLines, maxLines] = d3.extent(commits, d => d.totalLines)
  const rScale = d3.scaleSqrt().domain([minLines, maxLines]).range([3, 30])

  const svg = d3.select(chart).html('')
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('class', 'commit-chart')
    .attr('role', 'img')
    .attr('aria-label', 'Scatterplot of commits by date and time of day. Dot size shows lines edited.')

  // Gridlines go in first so the axes and dots sit on top of them.
  svg.append('g')
    .attr('class', 'gridlines')
    .attr('transform', `translate(${usableArea.left}, 0)`)
    .call(d3.axisLeft(yScale).tickFormat('').tickSize(-usableArea.width))

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${usableArea.bottom})`)
    .call(d3.axisBottom(xScale))

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${usableArea.left}, 0)`)
    .call(d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, '0') + ':00'))

  let hideTimer = null
  const cancelHide = () => clearTimeout(hideTimer)
  const scheduleHide = () => {
    cancelHide()
    hideTimer = setTimeout(() => updateTooltipVisibility(tooltip, false), TOOLTIP_HIDE_DELAY)
  }

  function showTooltip(commit, point) {
    cancelHide()
    renderTooltipContent(tooltip, commit)
    updateTooltipVisibility(tooltip, true)
    updateTooltipPosition(tooltip, point)
  }

  // Largest first, so small dots draw on top and stay hoverable.
  const sortedCommits = d3.sort(commits, d => -d.totalLines)

  const dots = svg.append('g')
    .attr('class', 'dots')
    .selectAll('circle')
    .data(sortedCommits, d => d.id)
    .join('circle')
    .attr('cx', d => xScale(d.datetime))
    .attr('cy', d => yScale(d.hourFrac))
    .attr('r', d => rScale(d.totalLines))
    .attr('tabindex', 0)
    .attr('aria-label', d => `Commit ${d.id}, ${d.totalLines} lines`)
    .style('fill-opacity', 0.7)
    .on('mouseenter', (event, commit) => {
      d3.select(event.currentTarget).style('fill-opacity', 1)
      showTooltip(commit, event)
    })
    .on('mousemove', (event, commit) => {
      if (tooltip.hidden) showTooltip(commit, event)
      else updateTooltipPosition(tooltip, event)
    })
    .on('mouseleave', event => {
      d3.select(event.currentTarget).style('fill-opacity', 0.7)
      scheduleHide()
    })
    .on('focus', (event, commit) => {
      const { right, bottom } = event.currentTarget.getBoundingClientRect()
      showTooltip(commit, { clientX: right, clientY: bottom })
    })
    .on('blur', scheduleHide)

  function isCommitSelected(selection, commit) {
    if (!selection) return false
    const [[x0, y0], [x1, y1]] = selection
    const x = xScale(commit.datetime)
    const y = yScale(commit.hourFrac)
    return x >= x0 && x <= x1 && y >= y0 && y <= y1
  }

  function brushed(event) {
    const selection = event.selection
    dots.classed('selected', d => isCommitSelected(selection, d))
    const selectedCommits = commits.filter(d => isCommitSelected(selection, d))
    renderSelectionCount(selectionCount, selectedCommits)
    renderLanguageBreakdown(languageBreakdown, selectedCommits)
  }

  function createBrushSelector(target) {
    target.call(
      d3.brush()
        .extent([[usableArea.left, usableArea.top], [usableArea.right, usableArea.bottom]])
        .on('start brush end', brushed),
    )
    // The brush overlay would otherwise swallow the dots' hover events.
    target.selectAll('.dots, .overlay ~ *').raise()
  }

  createBrushSelector(svg)

  return cancelHide
}

export default function CommitExplorerWindow() {
  const [error, setError] = useState(null)
  const statsRef = useRef(null)
  const chartRef = useRef(null)
  const tooltipRef = useRef(null)
  const selectionCountRef = useRef(null)
  const languageBreakdownRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let cleanup = null

    loadData()
      .then(data => {
        if (cancelled) return
        const commits = processCommits(data)
        renderCommitInfo(statsRef.current, data, commits)
        cleanup = renderScatterPlot(chartRef.current, commits, {
          tooltip: tooltipRef.current,
          selectionCount: selectionCountRef.current,
          languageBreakdown: languageBreakdownRef.current,
        })
      })
      .catch(() => {
        if (!cancelled) setError('Could not load commit data.')
      })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  if (error) return <div className="commit-explorer commit-explorer-error">{error}</div>

  return (
    <div className="commit-explorer">
      <fieldset className="groupbox95 commit-section">
        <legend className="groupbox95-label">Summary</legend>
        <div ref={statsRef}>Loading commit data…</div>
      </fieldset>

      <fieldset className="groupbox95 commit-section commit-selection">
        <legend className="groupbox95-label">Selection</legend>
        <p className="commit-selection-count" ref={selectionCountRef}>No commits selected</p>
        <dl className="stats" ref={languageBreakdownRef} />
      </fieldset>

      <h2 className="commit-heading">Commits by time of day</h2>
      <p className="commit-hint">Dot size shows lines edited. Hover a dot for details, or drag across the chart to select commits.</p>
      <div className="commit-chart-frame sunken" ref={chartRef} />

      {/* Portaled out because the window's drag transform would otherwise
          make position: fixed relative to the window, not the viewport. */}
      {createPortal(
        <dl id="commit-tooltip" className="info tooltip raised" ref={tooltipRef} hidden>
          <dt>Commit</dt>
          <dd><a id="commit-link" target="_blank" rel="noreferrer" /></dd>
          <dt>Date</dt>
          <dd id="commit-date" />
          <dt>Time</dt>
          <dd id="commit-time" />
          <dt>Author</dt>
          <dd id="commit-author" />
          <dt>Lines edited</dt>
          <dd id="commit-lines" />
        </dl>,
        document.body,
      )}
    </div>
  )
}
