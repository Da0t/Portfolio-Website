import * as d3 from 'd3'

const DATA_URL = '/meta/loc.csv'
const REPO_URL = 'https://github.com/Da0t/Portfolio-Website'
const TOOLTIP_OFFSET = 12
// Gives the pointer time to cross from a dot to the tooltip's commit link.
const TOOLTIP_HIDE_DELAY = 300

export async function loadData() {
  return d3.csv(DATA_URL, row => ({
    ...row,
    line: Number(row.line),
    depth: Number(row.depth),
    length: Number(row.length),
    date: new Date(row.date + 'T00:00' + row.timezone),
    datetime: new Date(row.datetime),
  }))
}

export function processCommits(data) {
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

export function computeStats(data) {
  const fileLengths = d3.rollups(data, v => d3.max(v, d => d.line), d => d.file)
  const linesByPeriod = d3.rollups(
    data,
    v => v.length,
    d => d.datetime.toLocaleString('en', { dayPeriod: 'short' }),
  )
  return {
    files: fileLengths.length,
    longestFile: d3.max(fileLengths, d => d[1]),
    averageLineLength: Math.round(d3.mean(data, d => d.length)),
    busiestTime: d3.greatest(linesByPeriod, d => d[1])?.[0],
    languages: d3.sort(new Set(data.map(d => d.type))),
  }
}

export function languageBreakdown(selectedCommits) {
  const lines = selectedCommits.flatMap(d => d.lines)
  const counts = d3.rollup(lines, v => v.length, d => d.type)
  const format = d3.format('.1~%')
  return new Map(
    [...counts].map(([language, count]) => [language, `${count} lines (${format(count / lines.length)})`]),
  )
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

export function renderScatterPlot(chart, commits, { tooltip, onSelectionChange, onCommitClick }) {
  const width = 560
  const height = 640
  const margin = { top: 10, right: 24, bottom: 30, left: 44 }
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
    .call(d3.axisBottom(xScale).ticks(6))

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

  function isCommitSelected(selection, commit) {
    if (!selection) return false
    const [[x0, y0], [x1, y1]] = selection
    const x = xScale(commit.datetime)
    const y = yScale(commit.hourFrac)
    return x >= x0 && x <= x1 && y >= y0 && y <= y1
  }

  let dots = null

  function brushed(event) {
    const selection = event.selection
    dots.classed('selected', d => isCommitSelected(selection, d))
    onSelectionChange(commits.filter(d => isCommitSelected(selection, d)), event.type)
  }

  const brush = d3.brush()
    .extent([[usableArea.left, usableArea.top], [usableArea.right, usableArea.bottom]])
    .on('start brush end', brushed)

  // On its own layer, because d3.brush throws on pointer events from
  // elements it didn't create, such as dots and axes.
  const brushLayer = svg.append('g').attr('class', 'brush').call(brush)

  // Largest first, so small dots draw on top and stay hoverable.
  const sortedCommits = d3.sort(commits, d => -d.totalLines)

  dots = svg.append('g')
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
    .on('click', (_, commit) => onCommitClick(commit))

  return {
    setActiveCommit: id => dots.classed('active', d => d.id === id),
    clearSelection: () => brushLayer.call(brush.move, null),
    destroy: cancelHide,
  }
}
