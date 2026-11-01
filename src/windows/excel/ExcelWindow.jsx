import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { columnName, evaluate, FormulaError } from './formula'
import {
  computeStats,
  languageBreakdown,
  loadData,
  processCommits,
  renderScatterPlot,
} from './commitChart'
import './ExcelWindow.css'

const COLUMNS = 7
const EXTRA_ROWS = 12
const COLUMN_WIDTHS = [108, 112, 52, 72, 44, 56, 56]
const DATA_COLUMNS = ['Commit', 'Date', 'Time', 'Author', 'Lines']
const ROW_HEIGHT = 18

const SORT_KEYS = [
  c => c.id,
  c => c.datetime.getTime(),
  c => c.hourFrac,
  c => c.author,
  c => c.totalLines,
]

function rangeBounds(a, b) {
  return {
    top: Math.min(a.row, b.row),
    bottom: Math.max(a.row, b.row),
    left: Math.min(a.column, b.column),
    right: Math.max(a.column, b.column),
  }
}

const addressOf = ({ row, column }) => `${columnName(column)}${row + 1}`

function parseEntry(text) {
  const trimmed = text.trim()
  if (trimmed !== '' && !Number.isNaN(Number(trimmed))) return Number(trimmed)
  return text
}

function csvField(value) {
  const text = String(value)
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export default function ExcelWindow() {
  const [workbook, setWorkbook] = useState(null)
  const [loadError, setLoadError] = useState(false)
  const [sort, setSort] = useState({ column: 1, direction: -1 })
  const [selectedCommits, setSelectedCommits] = useState([])
  const [edits, setEdits] = useState({})
  const [active, setActive] = useState({ row: 0, column: 0 })
  const [anchor, setAnchor] = useState({ row: 0, column: 0 })
  const [editing, setEditing] = useState(null)
  const [openMenu, setOpenMenu] = useState(null)
  const [showGridlines, setShowGridlines] = useState(true)
  const [message, setMessage] = useState(null)

  const chartRef = useRef(null)
  const chartApi = useRef(null)
  const tooltipRef = useRef(null)
  const gridRef = useRef(null)
  const dragging = useRef(false)
  const pendingScroll = useRef(false)
  const rowOfCommit = useRef(new Map())

  useEffect(() => {
    let cancelled = false
    loadData()
      .then(data => {
        if (cancelled) return
        setWorkbook({ commits: processCommits(data), stats: computeStats(data), totalLoc: data.length })
      })
      .catch(() => {
        if (!cancelled) setLoadError(true)
      })
    return () => { cancelled = true }
  }, [])

  const headerRow = workbook ? 8 + workbook.stats.languages.length + 1 : 12

  const sortedCommits = useMemo(() => {
    if (!workbook) return []
    const key = SORT_KEYS[sort.column] ?? SORT_KEYS[1]
    return [...workbook.commits].sort((a, b) => {
      const x = key(a)
      const y = key(b)
      return (x < y ? -1 : x > y ? 1 : 0) * sort.direction
    })
  }, [workbook, sort])

  const selectedIds = useMemo(() => new Set(selectedCommits.map(c => c.id)), [selectedCommits])

  // Cells owned by the workbook. They're protected because the chart depends on them.
  const protectedCells = useMemo(() => {
    if (!workbook) return {}
    const { stats } = workbook
    const firstDataRow = headerRow + 2
    const lastDataRow = headerRow + 1 + workbook.commits.length
    const lines = `E${firstDataRow}:E${lastDataRow}`
    const breakdown = languageBreakdown(selectedCommits)
    const count = selectedCommits.length

    const cells = {
      A1: 'Summary',
      A2: 'Total LOC', B2: `=SUM(${lines})`,
      A3: 'Total commits', B3: `=COUNT(${lines})`,
      A4: 'Files', B4: stats.files,
      A5: 'Longest file (lines)', B5: stats.longestFile,
      A6: 'Avg line length', B6: stats.averageLineLength,
      A7: 'Busiest time of day', B7: stats.busiestTime,
      A8: 'Selection', B8: `${count || 'No'} commit${count === 1 ? '' : 's'} selected`,
    }
    stats.languages.forEach((language, i) => {
      cells[`A${9 + i}`] = language
      cells[`B${9 + i}`] = breakdown.get(language) ?? ''
    })
    DATA_COLUMNS.forEach((label, column) => {
      cells[`${columnName(column)}${headerRow + 1}`] = label
    })
    sortedCommits.forEach((commit, i) => {
      const row = firstDataRow + i
      cells[`A${row}`] = commit.id
      cells[`B${row}`] = commit.datetime.toLocaleDateString('en')
      cells[`C${row}`] = commit.datetime.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })
      cells[`D${row}`] = commit.author
      cells[`E${row}`] = commit.totalLines
    })
    return cells
  }, [workbook, headerRow, sortedCommits, selectedCommits])

  rowOfCommit.current = new Map(sortedCommits.map((c, i) => [c.id, headerRow + 1 + i]))

  const rowCount = headerRow + 1 + sortedCommits.length + EXTRA_ROWS

  const isProtected = address => address in protectedCells
  const rawValue = address => protectedCells[address] ?? edits[address] ?? ''

  function computeValue(address, visiting = new Set()) {
    const raw = rawValue(address)
    if (typeof raw !== 'string' || !raw.startsWith('=')) return raw
    if (visiting.has(address)) return '#REF!'
    visiting.add(address)
    try {
      return evaluate(raw.slice(1), {
        rows: rowCount,
        columns: COLUMNS,
        get: ref => computeValue(ref, visiting),
      })
    } catch (error) {
      if (error instanceof FormulaError) return error.code
      throw error
    } finally {
      visiting.delete(address)
    }
  }

  const bounds = rangeBounds(anchor, active)
  const activeAddress = addressOf(active)

  function computeRangeSum() {
    let sum = 0
    let hasNumber = false
    for (let row = bounds.top; row <= bounds.bottom; row++) {
      for (let column = bounds.left; column <= bounds.right; column++) {
        const value = computeValue(addressOf({ row, column }))
        if (typeof value === 'number') {
          sum += value
          hasNumber = true
        }
      }
    }
    return hasNumber ? Number(sum.toFixed(10)) : null
  }
  const rangeSum = computeRangeSum()

  // ── Chart ──────────────────────────────────────────────────
  useEffect(() => {
    if (!workbook) return undefined
    const api = renderScatterPlot(chartRef.current, workbook.commits, {
      tooltip: tooltipRef.current,
      onSelectionChange: (selected, type) => {
        setSelectedCommits(selected)
        if (type === 'end' && selected.length) pendingScroll.current = true
      },
      onCommitClick: commit => {
        const row = rowOfCommit.current.get(commit.id)
        selectCell({ row, column: 0 })
      },
    })
    chartApi.current = api
    return () => api.destroy()
  }, [workbook])

  // Clicking a row marks its dot on the chart.
  const activeCommit = active.row > headerRow ? sortedCommits[active.row - headerRow - 1] : null
  useEffect(() => {
    chartApi.current?.setActiveCommit(activeCommit?.id ?? null)
  }, [activeCommit])

  function scrollToRow(row, column = 0) {
    gridRef.current
      ?.querySelector(`[data-address="${addressOf({ row, column })}"]`)
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  // Bring the first brushed commit into view once the drag ends.
  useEffect(() => {
    if (!pendingScroll.current) return
    pendingScroll.current = false
    const first = sortedCommits.find(c => selectedIds.has(c.id))
    if (first) scrollToRow(rowOfCommit.current.get(first.id))
  })

  // ── Selection and editing ──────────────────────────────────
  function selectCell(cell, extend = false) {
    setActive(cell)
    if (!extend) setAnchor(cell)
    setMessage(null)
    requestAnimationFrame(() => scrollToRow(cell.row, cell.column))
  }

  function commitEdit(move = 1) {
    if (!editing) return
    const entry = parseEntry(editing.value)
    setEdits(prev => {
      const next = { ...prev }
      if (entry === '') delete next[editing.address]
      else next[editing.address] = entry
      return next
    })
    setEditing(null)
    if (move) selectCell({ row: Math.min(active.row + move, rowCount - 1), column: active.column })
    gridRef.current?.focus()
  }

  function beginEdit(value) {
    if (isProtected(activeAddress)) {
      setMessage('This cell is protected because the chart depends on it.')
      return
    }
    setEditing({ address: activeAddress, value })
  }

  function clearRange() {
    let blocked = false
    setEdits(prev => {
      const next = { ...prev }
      for (let row = bounds.top; row <= bounds.bottom; row++) {
        for (let column = bounds.left; column <= bounds.right; column++) {
          const address = addressOf({ row, column })
          if (isProtected(address)) blocked = true
          else delete next[address]
        }
      }
      return next
    })
    if (blocked) setMessage('Protected cells were left unchanged.')
  }

  function handleGridKeyDown(event) {
    if (editing) return
    const moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1], Tab: [0, 1], Enter: [1, 0] }
    const move = moves[event.key]
    if (move) {
      event.preventDefault()
      selectCell({
        row: Math.max(0, Math.min(rowCount - 1, active.row + move[0])),
        column: Math.max(0, Math.min(COLUMNS - 1, active.column + move[1])),
      }, event.shiftKey && event.key.startsWith('Arrow'))
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault()
      clearRange()
    } else if (event.key === 'F2') {
      event.preventDefault()
      const raw = rawValue(activeAddress)
      beginEdit(String(raw))
    } else if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'c') {
      event.preventDefault()
      copyRange()
    } else if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault()
      beginEdit(event.key)
    }
  }

  function handleCellMouseDown(event, cell) {
    if (editing) commitEdit(0)
    gridRef.current?.focus({ preventScroll: true })
    dragging.current = true
    selectCell(cell, event.shiftKey)
  }

  useEffect(() => {
    const stop = () => { dragging.current = false }
    document.addEventListener('mouseup', stop)
    return () => document.removeEventListener('mouseup', stop)
  }, [])

  useEffect(() => {
    if (!openMenu) return undefined
    const close = event => {
      if (!event.target.closest('.xl-menubar')) setOpenMenu(null)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [openMenu])

  // ── Commands ───────────────────────────────────────────────
  function copyRange() {
    const rows = []
    for (let row = bounds.top; row <= bounds.bottom; row++) {
      const cells = []
      for (let column = bounds.left; column <= bounds.right; column++) {
        cells.push(computeValue(addressOf({ row, column })))
      }
      rows.push(cells.join('\t'))
    }
    navigator.clipboard?.writeText(rows.join('\n'))
      .then(() => setMessage('Copied to the clipboard.'))
      .catch(() => setMessage('The browser blocked clipboard access.'))
  }

  function saveCsv() {
    const rows = [DATA_COLUMNS, ...sortedCommits.map(c => [
      c.id,
      c.datetime.toLocaleDateString('en'),
      c.datetime.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false }),
      c.author,
      c.totalLines,
    ])]
    const blob = new Blob([rows.map(r => r.map(csvField).join(',')).join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'commits.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  function sortBy(direction) {
    if (active.column >= DATA_COLUMNS.length) {
      setMessage('Select a cell in columns A to E to sort.')
      return
    }
    setSort({ column: active.column, direction })
  }

  const MENUS = {
    File: [{ label: 'Save As CSV', run: saveCsv }],
    Edit: [
      { label: 'Copy', run: copyRange },
      { label: 'Clear Contents', run: clearRange },
    ],
    View: [{
      label: `${showGridlines ? 'Hide' : 'Show'} Gridlines`,
      run: () => setShowGridlines(shown => !shown),
    }],
    Data: [
      { label: 'Sort Ascending', run: () => sortBy(1) },
      { label: 'Sort Descending', run: () => sortBy(-1) },
      { label: 'Clear Chart Selection', run: () => chartApi.current?.clearSelection() },
    ],
  }

  const formulaValue = editing ? editing.value : String(rawValue(activeAddress))
  const status = loadError
    ? 'Could not load commit data.'
    : message ?? (workbook ? 'Ready' : 'Loading commit data…')

  const frozenTop = row => ROW_HEIGHT * (row + 1)

  function renderCell(row, column) {
    const address = addressOf({ row, column })
    const inRange = row >= bounds.top && row <= bounds.bottom && column >= bounds.left && column <= bounds.right
    const isActive = row === active.row && column === active.column
    const commit = row > headerRow ? sortedCommits[row - headerRow - 1] : null
    const value = computeValue(address)
    const classes = ['xl-cell']
    if (typeof value === 'number') classes.push('xl-number')
    if (typeof value === 'string' && value.startsWith('#')) classes.push('xl-error')
    if (commit && column < DATA_COLUMNS.length && selectedIds.has(commit.id)) classes.push('xl-brushed')
    if (inRange && !isActive) classes.push('xl-in-range')
    if (isActive) classes.push('xl-active')
    if (row === 0 || row === 7 || row === headerRow) classes.push('xl-label')
    if (row === headerRow) classes.push('xl-frozen-edge')

    return (
      <td
        key={address}
        data-address={address}
        className={classes.join(' ')}
        style={row <= headerRow ? { position: 'sticky', top: frozenTop(row), zIndex: 2 } : undefined}
        onMouseDown={event => handleCellMouseDown(event, { row, column })}
        onMouseEnter={() => { if (dragging.current) selectCell({ row, column }, true) }}
        onDoubleClick={() => beginEdit(String(rawValue(address)))}
      >
        {editing?.address === address ? (
          <input
            className="xl-cell-editor"
            autoFocus
            value={editing.value}
            onChange={event => setEditing({ address, value: event.target.value })}
            onMouseDown={event => event.stopPropagation()}
            onKeyDown={event => {
              event.stopPropagation()
              if (event.key === 'Enter') commitEdit()
              if (event.key === 'Tab') { event.preventDefault(); commitEdit(0); selectCell({ row, column: Math.min(COLUMNS - 1, column + 1) }) }
              if (event.key === 'Escape') { setEditing(null); gridRef.current?.focus() }
            }}
          />
        ) : value}
      </td>
    )
  }

  return (
    <div className="xl-window">
      <div className="xl-menubar">
        {Object.entries(MENUS).map(([name, items]) => (
          <div key={name} className="xl-menu">
            <button
              className={`xl-menu-button ${openMenu === name ? 'xl-menu-open' : ''}`}
              onClick={() => setOpenMenu(openMenu === name ? null : name)}
            >
              {name}
            </button>
            {openMenu === name && (
              <div className="xl-menu-items raised">
                {items.map(item => (
                  <button
                    key={item.label}
                    className="xl-menu-item"
                    onClick={() => { setOpenMenu(null); item.run() }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="xl-toolbar">
        <button className="btn95" onClick={saveCsv}>Save CSV</button>
        <button className="btn95" onClick={() => sortBy(1)}>Sort A-Z</button>
        <button className="btn95" onClick={() => sortBy(-1)}>Sort Z-A</button>
        <button className="btn95" onClick={() => chartApi.current?.clearSelection()}>Clear Selection</button>
      </div>

      <div className="xl-formula-bar">
        <div className="xl-name-box sunken">{activeAddress}</div>
        <input
          className="xl-formula-input sunken"
          aria-label="Formula bar"
          value={formulaValue}
          readOnly={isProtected(activeAddress)}
          onFocus={() => {
            if (!editing && !isProtected(activeAddress)) setEditing({ address: activeAddress, value: formulaValue })
          }}
          onChange={event => setEditing({ address: activeAddress, value: event.target.value })}
          onKeyDown={event => {
            if (event.key === 'Enter') commitEdit()
            if (event.key === 'Escape') { setEditing(null); gridRef.current?.focus() }
          }}
        />
      </div>

      <div className="xl-workspace">
        <div className="xl-sheet-pane sunken">
          <div
            className={`xl-grid ${showGridlines ? '' : 'xl-no-gridlines'}`}
            ref={gridRef}
            tabIndex={0}
            onKeyDown={handleGridKeyDown}
          >
            <table style={{ width: 28 + COLUMN_WIDTHS.reduce((a, b) => a + b, 0) }}>
              <colgroup>
                <col style={{ width: 28 }} />
                {COLUMN_WIDTHS.map((width, i) => <col key={i} style={{ width }} />)}
              </colgroup>
              <thead>
                <tr>
                  <th className="xl-corner" />
                  {COLUMN_WIDTHS.map((_, column) => (
                    <th
                      key={column}
                      className={`xl-column-header ${column >= bounds.left && column <= bounds.right ? 'xl-header-on' : ''}`}
                    >
                      {columnName(column)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rowCount }, (_, row) => (
                  <tr key={row}>
                    <th
                      className={`xl-row-header ${row >= bounds.top && row <= bounds.bottom ? 'xl-header-on' : ''}`}
                      style={row <= headerRow ? { top: frozenTop(row), zIndex: 3 } : undefined}
                    >
                      {row + 1}
                    </th>
                    {COLUMN_WIDTHS.map((_, column) => renderCell(row, column))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="xl-tabs"><span className="xl-tab">commits</span></div>
        </div>

        <div className="xl-chart-pane raised">
          <div className="xl-chart-title">Chart1 - Commits by time of day</div>
          <div className="xl-chart-area sunken" ref={chartRef} />
          <p className="xl-chart-hint">Built with D3. Dot size shows lines edited. Hover a dot, drag to select commits, or click a dot to find its row.</p>
        </div>
      </div>

      <div className="xl-statusbar statusbar95 inset">
        <span>{status}</span>
        <span className="xl-sum">{rangeSum === null ? '' : `Sum=${rangeSum}`}</span>
      </div>

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
