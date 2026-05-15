import { useState, useEffect, useCallback, useRef } from 'react'

const ROWS = 9
const COLS = 9
const MINES = 10

function buildEmpty() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adj: 0,
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
  // calc adjacency
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (g[r][c].mine) continue
      let count = 0
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && g[nr][nc].mine) count++
        }
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
    if (cell.adj === 0) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          if (dr !== 0 || dc !== 0) stack.push([cr + dr, cc + dc])
    }
  }
  return g
}

const ADJ_COLORS = ['', '#0000FF', '#008000', '#FF0000', '#000080', '#8B0000', '#008080', '#000000', '#808080']

const SEG_STYLE = {
  fontFamily: '"Courier New", monospace',
  fontSize: '24px',
  fontWeight: '700',
  color: '#FF0000',
  background: '#000',
  padding: '1px 6px',
  minWidth: '44px',
  display: 'inline-block',
  textAlign: 'right',
  letterSpacing: '2px',
  userSelect: 'none',
}

function SevenSeg({ value }) {
  const v = Math.max(-99, Math.min(999, value))
  const s = v < 0 ? `-${String(Math.abs(v)).padStart(2, '0')}` : String(v).padStart(3, '0')
  return <span style={SEG_STYLE}>{s}</span>
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

export default function MinesweeperWindow() {
  const [grid, setGrid] = useState(buildEmpty)
  const [status, setStatus] = useState('idle') // idle | playing | won | lost
  const [flagCount, setFlagCount] = useState(0)
  const [face, setFace] = useState('🙂')
  const [timerRunning, setTimerRunning] = useState(false)
  const [secs, resetTimer] = useTimer(timerRunning)

  const reset = useCallback(() => {
    setGrid(buildEmpty())
    setStatus('idle')
    setFlagCount(0)
    setFace('🙂')
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
      // reveal all mines
      const exploded = g.map((row, ri) => row.map((cell, ci) => {
        if (cell.mine) return { ...cell, revealed: true }
        return cell
      }))
      setGrid(exploded)
      setStatus('lost')
      setTimerRunning(false)
      setFace('😵')
      return
    }

    const next = floodReveal(g, r, c)
    setGrid(next)

    // check win
    const unrevealed = next.flat().filter(c => !c.revealed && !c.mine).length
    if (unrevealed === 0) {
      setStatus('won')
      setTimerRunning(false)
      setFace('😎')
    }
  }

  function handleFlag(e, r, c) {
    e.preventDefault()
    if (status === 'won' || status === 'lost' || status === 'idle') return
    const cell = grid[r][c]
    if (cell.revealed) return
    const next = grid.map((row, ri) => row.map((cl, ci) => {
      if (ri === r && ci === c) return { ...cl, flagged: !cl.flagged }
      return cl
    }))
    setGrid(next)
    setFlagCount(f => cell.flagged ? f - 1 : f + 1)
  }

  function handleMouseDown() { if (status === 'playing') setFace('😮') }
  function handleMouseUp()   { if (status === 'playing') setFace('🙂') }

  const remaining = MINES - flagCount

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'var(--gray)',
        height: '100%',
        padding: '12px',
        userSelect: 'none',
      }}
      onContextMenu={e => e.preventDefault()}
    >
      {/* Header panel */}
      <div style={{
        width: '100%',
        maxWidth: 204,
        background: 'var(--gray)',
        boxShadow: 'inset 2px 2px 0 var(--gray-dark), inset -2px -2px 0 var(--white)',
        padding: '6px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
      }}>
        <SevenSeg value={remaining} />
        <button
          onClick={reset}
          style={{
            width: 30, height: 30,
            fontSize: 16,
            background: 'var(--gray)',
            border: 'none',
            cursor: 'default',
            boxShadow: 'inset 1px 1px 0 var(--white), inset -1px -1px 0 var(--gray-dark), 0 0 0 1px var(--black)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {face}
        </button>
        <SevenSeg value={secs} />
      </div>

      {/* Grid */}
      <div
        style={{
          boxShadow: 'inset 2px 2px 0 var(--gray-dark), inset -2px -2px 0 var(--white)',
          padding: 2,
          display: 'inline-block',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {grid.map((row, r) => (
          <div key={r} style={{ display: 'flex' }}>
            {row.map((cell, c) => (
              <Cell
                key={c}
                cell={cell}
                isLost={status === 'lost'}
                onClick={() => handleReveal(r, c)}
                onContextMenu={e => handleFlag(e, r, c)}
              />
            ))}
          </div>
        ))}
      </div>

      {status === 'won' && (
        <div style={{ marginTop: 10, fontSize: 13, fontFamily: 'var(--font)', color: 'var(--navy)', fontWeight: 'bold' }}>
          You Win! 🎉 Time: {secs}s
        </div>
      )}
      {status === 'lost' && (
        <div style={{ marginTop: 10, fontSize: 13, fontFamily: 'var(--font)', color: '#CC0000', fontWeight: 'bold' }}>
          Game Over! Click 😵 to restart
        </div>
      )}
    </div>
  )
}

function Cell({ cell, isLost, onClick, onContextMenu }) {
  if (cell.revealed) {
    if (cell.mine) {
      return (
        <div style={{
          width: 22, height: 22,
          background: isLost ? '#FF0000' : 'var(--gray)',
          boxShadow: 'inset 1px 1px 0 var(--gray-dark), inset -1px -1px 0 var(--gray-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13,
        }}>
          💣
        </div>
      )
    }
    return (
      <div style={{
        width: 22, height: 22,
        background: 'var(--gray-light)',
        boxShadow: 'inset 1px 1px 0 var(--gray-dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12,
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
        width: 22, height: 22,
        background: 'var(--gray)',
        cursor: 'default',
        boxShadow: 'inset 1px 1px 0 var(--white), inset -1px -1px 0 var(--gray-dark), 0 0 0 1px var(--black)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13,
      }}
    >
      {cell.flagged ? '🚩' : ''}
    </div>
  )
}
