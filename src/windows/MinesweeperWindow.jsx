import { useState, useEffect, useCallback, useRef } from 'react'

const ROWS = 9
const COLS = 9
const MINES = 10
const PADDING = 12   // outer padding on each side
const HEADER_RATIO = 0.14  // header height as fraction of board height

function buildEmpty() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false, revealed: false, flagged: false, adj: 0,
    }))
  )
}

function placeMines(grid, safeR, safeC) {
  const g = grid.map(r => r.map(c => ({ ...c })))
  let placed = 0
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS)
    const c = Math.floor(Math.random() * COLS)
    if (!g[r][c].mine && !(r === safeR && c === safeC)) {
      g[r][c].mine = true
      placed++
    }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (g[r][c].mine) continue
      let count = 0
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && g[nr][nc].mine) count++
        }
      g[r][c].adj = count
    }
  }
  return g
}

function floodReveal(grid, r, c) {
  const g = grid.map(row => row.map(cell => ({ ...cell })))
  const stack = [[r, c]]
  while (stack.length) {
    const [cr, cc] = stack.pop()
    if (cr < 0 || cr >= ROWS || cc < 0 || cc >= COLS) continue
    const cell = g[cr][cc]
    if (cell.revealed || cell.flagged || cell.mine) continue
    cell.revealed = true
    if (cell.adj === 0)
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          if (dr !== 0 || dc !== 0) stack.push([cr + dr, cc + dc])
  }
  return g
}

const ADJ_COLORS = ['', '#0000FF', '#008000', '#FF0000', '#000080', '#8B0000', '#008080', '#000000', '#808080']

/* ── SVG face icons (no emojis) ─────────────────────────────── */
const FACES = {
  idle: (s) => (
    <svg viewBox="0 0 16 16" width={s} height={s}>
      <circle cx="8" cy="8" r="7" fill="#FFE000" stroke="#000" strokeWidth="1"/>
      <circle cx="5.5" cy="6.5" r="1" fill="#000"/>
      <circle cx="10.5" cy="6.5" r="1" fill="#000"/>
      <path d="M5 10 Q8 12.5 11 10" stroke="#000" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  pressing: (s) => (
    <svg viewBox="0 0 16 16" width={s} height={s}>
      <circle cx="8" cy="8" r="7" fill="#FFE000" stroke="#000" strokeWidth="1"/>
      <circle cx="5.5" cy="6.5" r="1" fill="#000"/>
      <circle cx="10.5" cy="6.5" r="1" fill="#000"/>
      <circle cx="8" cy="10.5" r="1.8" fill="#000"/>
    </svg>
  ),
  dead: (s) => (
    <svg viewBox="0 0 16 16" width={s} height={s}>
      <circle cx="8" cy="8" r="7" fill="#FFE000" stroke="#000" strokeWidth="1"/>
      <line x1="4.5" y1="5.5" x2="6.5" y2="7.5" stroke="#000" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="6.5" y1="5.5" x2="4.5" y2="7.5" stroke="#000" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="9.5" y1="5.5" x2="11.5" y2="7.5" stroke="#000" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="11.5" y1="5.5" x2="9.5" y2="7.5" stroke="#000" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M5 11 Q8 9 11 11" stroke="#000" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  won: (s) => (
    <svg viewBox="0 0 16 16" width={s} height={s}>
      <circle cx="8" cy="8" r="7" fill="#FFE000" stroke="#000" strokeWidth="1"/>
      <rect x="3.5" y="5.5" width="4" height="2.5" rx="1" fill="#000"/>
      <rect x="8.5" y="5.5" width="4" height="2.5" rx="1" fill="#000"/>
      <path d="M5 10.5 Q8 13.5 11 10.5" stroke="#000" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
}

function FaceIcon({ state, size }) {
  return FACES[state]?.(size) ?? FACES.idle(size)
}

function MineIcon({ size, isRed }) {
  const s = size - 2
  return (
    <svg viewBox="0 0 16 16" width={s} height={s} style={{ display: 'block' }}>
      {isRed && <rect width="16" height="16" fill="#FF0000"/>}
      {/* spikes */}
      <line x1="8" y1="1" x2="8" y2="15" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="1" y1="8" x2="15" y2="8" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="3" x2="13" y2="13" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="3" x2="3" y2="13" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
      {/* body */}
      <circle cx="8" cy="8" r="4" fill="#000"/>
      {/* shine */}
      <circle cx="6.5" cy="6.5" r="1.2" fill="#fff" opacity="0.6"/>
    </svg>
  )
}

function FlagIcon({ size }) {
  const s = size - 2
  return (
    <svg viewBox="0 0 16 16" width={s} height={s} style={{ display: 'block' }}>
      {/* pole */}
      <line x1="5" y1="2" x2="5" y2="14" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
      {/* flag */}
      <polygon points="5,2 13,5 5,8" fill="#FF0000"/>
      {/* base */}
      <line x1="3" y1="14" x2="8" y2="14" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function useTimer(running) {
  const [secs, setSecs] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setSecs(s => Math.min(999, s + 1)), 1000)
    } else {
      clearInterval(ref.current)
    }
    return () => clearInterval(ref.current)
  }, [running])
  return [secs, () => setSecs(0)]
}

function SevenSeg({ value, fontSize }) {
  const v = Math.max(-99, Math.min(999, value))
  const s = v < 0 ? `-${String(Math.abs(v)).padStart(2, '0')}` : String(v).padStart(3, '0')
  return (
    <span style={{
      fontFamily: '"Courier New", monospace',
      fontSize,
      fontWeight: '700',
      color: '#FF0000',
      background: '#000',
      padding: `${Math.round(fontSize * 0.1)}px ${Math.round(fontSize * 0.25)}px`,
      minWidth: Math.round(fontSize * 2),
      display: 'inline-block',
      textAlign: 'right',
      letterSpacing: Math.round(fontSize * 0.08),
      userSelect: 'none',
      lineHeight: 1.2,
    }}>
      {s}
    </span>
  )
}

export default function MinesweeperWindow() {
  const [grid, setGrid] = useState(buildEmpty)
  const [status, setStatus] = useState('idle')
  const [flagCount, setFlagCount] = useState(0)
  const [face, setFace] = useState('idle')
  const [timerRunning, setTimerRunning] = useState(false)
  const [secs, resetTimer] = useTimer(timerRunning)
  const [cellSize, setCellSize] = useState(32)

  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const obs = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        const availW = width - PADDING * 2 - 4  // 4 for grid border
        // Reserve ~18% of height for header + status message
        const availH = height - PADDING * 2 - 4 - Math.round(height * 0.18)
        const sz = Math.max(20, Math.floor(Math.min(availW / COLS, availH / ROWS)))
        setCellSize(sz)
      }
    })
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  const reset = useCallback(() => {
    setGrid(buildEmpty())
    setStatus('idle')
    setFlagCount(0)
    setFace('idle')
    setTimerRunning(false)
    resetTimer()
  }, [])

  function handleReveal(r, c) {
    if (status === 'won' || status === 'lost') return
    const cell = grid[r][c]
    if (cell.revealed || cell.flagged) return

    let g = grid
    if (status === 'idle') {
      g = placeMines(grid, r, c)
      setTimerRunning(true)
      setStatus('playing')
    }

    if (g[r][c].mine) {
      const exploded = g.map(row => row.map(cell =>
        cell.mine ? { ...cell, revealed: true } : cell
      ))
      setGrid(exploded)
      setStatus('lost')
      setTimerRunning(false)
      setFace('dead')
      return
    }

    const next = floodReveal(g, r, c)
    setGrid(next)
    if (next.flat().filter(c => !c.revealed && !c.mine).length === 0) {
      setStatus('won')
      setTimerRunning(false)
      setFace('won')
    }
  }

  function handleFlag(e, r, c) {
    e.preventDefault()
    if (status === 'won' || status === 'lost' || status === 'idle') return
    const cell = grid[r][c]
    if (cell.revealed) return
    const next = grid.map((row, ri) => row.map((cl, ci) =>
      ri === r && ci === c ? { ...cl, flagged: !cl.flagged } : cl
    ))
    setGrid(next)
    setFlagCount(f => cell.flagged ? f - 1 : f + 1)
  }

  const remaining = MINES - flagCount
  const headerH = Math.round(cellSize * 1.6)
  const btnSize = Math.round(cellSize * 1.2)
  const segFontSize = Math.round(cellSize * 0.9)
  const boardW = COLS * cellSize
  const msgFontSize = Math.max(11, Math.round(cellSize * 0.52))

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--gray)',
        height: '100%',
        padding: PADDING,
        userSelect: 'none',
        overflow: 'hidden',
      }}
      onContextMenu={e => e.preventDefault()}
    >
      {/* Header panel */}
      <div style={{
        width: boardW + 4,  // +4 for grid border padding
        background: 'var(--gray)',
        boxShadow: 'inset 2px 2px 0 var(--gray-dark), inset -2px -2px 0 var(--white)',
        padding: `${Math.round(cellSize * 0.18)}px ${Math.round(cellSize * 0.25)}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
        height: headerH,
        flexShrink: 0,
      }}>
        <SevenSeg value={remaining} fontSize={segFontSize} />
        <button
          onClick={reset}
          style={{
            width: btnSize, height: btnSize,
            background: 'var(--gray)',
            border: 'none',
            cursor: 'default',
            boxShadow: 'inset 1px 1px 0 var(--white), inset -1px -1px 0 var(--gray-dark), 0 0 0 1px var(--black)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            padding: 0,
          }}
        >
          <FaceIcon state={face} size={Math.round(btnSize * 0.76)} />
        </button>
        <SevenSeg value={secs} fontSize={segFontSize} />
      </div>

      {/* Grid */}
      <div
        style={{
          boxShadow: 'inset 2px 2px 0 var(--gray-dark), inset -2px -2px 0 var(--white)',
          padding: 2,
          display: 'inline-block',
          flexShrink: 0,
        }}
        onMouseDown={() => { if (status === 'playing') setFace('pressing') }}
        onMouseUp={()   => { if (status === 'playing') setFace('idle') }}
      >
        {grid.map((row, r) => (
          <div key={r} style={{ display: 'flex' }}>
            {row.map((cell, c) => (
              <Cell
                key={c}
                cell={cell}
                isLost={status === 'lost'}
                size={cellSize}
                onClick={() => handleReveal(r, c)}
                onContextMenu={e => handleFlag(e, r, c)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Status message */}
      <div style={{
        marginTop: 8,
        fontSize: msgFontSize,
        fontFamily: 'var(--font)',
        fontWeight: 'bold',
        color: status === 'won' ? 'var(--navy)' : status === 'lost' ? '#CC0000' : 'transparent',
        height: msgFontSize + 8,
        flexShrink: 0,
      }}>
        {status === 'won'  && `You Win! Time: ${secs}s`}
        {status === 'lost' && 'Game Over! Click the face to restart'}
        {(status === 'idle' || status === 'playing') && '.'}
      </div>
    </div>
  )
}

function Cell({ cell, isLost, size, onClick, onContextMenu }) {
  const fontSize = Math.round(size * 0.58)

  if (cell.revealed) {
    if (cell.mine) {
      return (
        <div style={{
          width: size, height: size,
          background: isLost ? '#FF0000' : 'var(--gray)',
          boxShadow: 'inset 1px 1px 0 var(--gray-dark), inset -1px -1px 0 var(--gray-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <MineIcon size={size} isRed={isLost} />
        </div>
      )
    }
    return (
      <div style={{
        width: size, height: size,
        background: 'var(--gray-light)',
        boxShadow: 'inset 1px 1px 0 var(--gray-dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize,
        fontWeight: 'bold',
        fontFamily: 'var(--font)',
        color: cell.adj > 0 ? ADJ_COLORS[cell.adj] : 'transparent',
      }}>
        {cell.adj > 0 ? cell.adj : ''}
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{
        width: size, height: size,
        background: 'var(--gray)',
        cursor: 'default',
        boxShadow: 'inset 1px 1px 0 var(--white), inset -1px -1px 0 var(--gray-dark), 0 0 0 1px var(--black)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {cell.flagged ? <FlagIcon size={size} /> : null}
    </div>
  )
}
