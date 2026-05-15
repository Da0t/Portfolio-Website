import { useState, useEffect, useRef, useCallback } from 'react'

/* ── Constants ──────────────────────────────────────────────── */
const ROWS = 20
const COLS = 10
const CELL = 26

const LEVELS = {
  easy:   { label: 'Easy',   tick: 700, color: '#34C759' },
  medium: { label: 'Medium', tick: 380, color: '#FF9500' },
  hard:   { label: 'Hard',   tick: 160, color: '#FF3B30' },
}

const PIECES = [
  { shape: [[1,1,1,1]],           color: '#00C7C7' }, // I
  { shape: [[1,1],[1,1]],         color: '#FFD600' }, // O
  { shape: [[0,1,0],[1,1,1]],     color: '#9B59B6' }, // T
  { shape: [[1,0,0],[1,1,1]],     color: '#3498DB' }, // J
  { shape: [[0,0,1],[1,1,1]],     color: '#E67E22' }, // L
  { shape: [[0,1,1],[1,1,0]],     color: '#2ECC71' }, // S
  { shape: [[1,1,0],[0,1,1]],     color: '#E74C3C' }, // Z
]

const LINE_SCORES = [0, 100, 300, 500, 800]

/* ── Pure helpers ───────────────────────────────────────────── */
function emptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null))
}

function randPiece() {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)]
  const c = Math.floor((COLS - p.shape[0].length) / 2)
  return { shape: p.shape.map(r => [...r]), color: p.color, r: 0, c }
}

function rotate90(shape) {
  return shape[0].map((_, ci) => shape.map(row => row[ci]).reverse())
}

function fits(board, shape, r, c) {
  for (let dr = 0; dr < shape.length; dr++) {
    for (let dc = 0; dc < shape[dr].length; dc++) {
      if (!shape[dr][dc]) continue
      const nr = r + dr, nc = c + dc
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc]) return false
    }
  }
  return true
}

function lockPiece(board, piece) {
  const b = board.map(r => [...r])
  piece.shape.forEach((row, dr) => {
    row.forEach((v, dc) => {
      if (v) b[piece.r + dr][piece.c + dc] = piece.color
    })
  })
  return b
}

function clearLines(board) {
  const kept = board.filter(row => row.some(c => !c))
  const n = ROWS - kept.length
  return {
    board: [...Array.from({ length: n }, () => Array(COLS).fill(null)), ...kept],
    cleared: n,
  }
}

/* ── Component ──────────────────────────────────────────────── */
export default function TetrisContent() {
  // All game data in a single ref to avoid stale closures in the interval
  const G = useRef({
    board: emptyBoard(),
    piece: null,
    next: null,
    score: 0,
    lines: 0,
    level: 1,
  })

  const [phase, setPhase]       = useState('select')   // select | playing | over
  const [difficulty, setDiff]   = useState(null)
  const [tick, setTick]         = useState(null)
  const [, forceRender]         = useState(0)

  const tickRef   = useRef(null)
  const phaseRef  = useRef('select')

  function render() { forceRender(n => n + 1) }

  /* ── Spawn next piece ──────────────────────────── */
  function spawnNext() {
    const g = G.current
    const p = g.next || randPiece()
    const n = randPiece()
    if (!fits(g.board, p.shape, p.r, p.c)) {
      // game over
      g.piece = null
      g.next  = null
      phaseRef.current = 'over'
      setPhase('over')
      clearInterval(tickRef.current)
      render()
      return false
    }
    g.piece = p
    g.next  = n
    return true
  }

  /* ── Lock current piece, clear lines, spawn next ── */
  function commitPiece() {
    const g = G.current
    if (!g.piece) return
    const locked = lockPiece(g.board, g.piece)
    const { board: cleared, cleared: n } = clearLines(locked)
    g.board  = cleared
    g.lines += n
    g.level  = Math.floor(g.lines / 10) + 1
    g.score += LINE_SCORES[n] * g.level
    g.piece  = null
    spawnNext()
    render()
  }

  /* ── Tick: drop one row ─────────────────────────── */
  const stepDown = useCallback(() => {
    if (phaseRef.current !== 'playing') return
    const g = G.current
    if (!g.piece) return
    const nr = g.piece.r + 1
    if (fits(g.board, g.piece.shape, nr, g.piece.c)) {
      g.piece = { ...g.piece, r: nr }
      render()
    } else {
      commitPiece()
    }
  }, [])

  /* ── Start game ─────────────────────────────────── */
  function startGame(diff) {
    const cfg = LEVELS[diff]
    G.current = {
      board: emptyBoard(),
      piece: null,
      next:  randPiece(),
      score: 0,
      lines: 0,
      level: 1,
    }
    spawnNext()
    setDiff(diff)
    setTick(cfg.tick)
    phaseRef.current = 'playing'
    setPhase('playing')
    render()
  }

  /* ── Restart ──────────────────────────────────── */
  function restart() {
    clearInterval(tickRef.current)
    phaseRef.current = 'select'
    setPhase('select')
    setDiff(null)
  }

  /* ── Run interval ────────────────────────────── */
  useEffect(() => {
    if (phase !== 'playing' || tick === null) return
    clearInterval(tickRef.current)
    tickRef.current = setInterval(stepDown, tick)
    return () => clearInterval(tickRef.current)
  }, [phase, tick, stepDown])

  /* ── Controls ────────────────────────────────── */
  function moveLeft() {
    const g = G.current
    if (!g.piece || phaseRef.current !== 'playing') return
    if (fits(g.board, g.piece.shape, g.piece.r, g.piece.c - 1)) {
      g.piece = { ...g.piece, c: g.piece.c - 1 }
      render()
    }
  }

  function moveRight() {
    const g = G.current
    if (!g.piece || phaseRef.current !== 'playing') return
    if (fits(g.board, g.piece.shape, g.piece.r, g.piece.c + 1)) {
      g.piece = { ...g.piece, c: g.piece.c + 1 }
      render()
    }
  }

  function rotatePiece() {
    const g = G.current
    if (!g.piece || phaseRef.current !== 'playing') return
    const rotated = rotate90(g.piece.shape)
    // Try rotation with wall kicks
    for (const kick of [0, 1, -1, 2, -2]) {
      if (fits(g.board, rotated, g.piece.r, g.piece.c + kick)) {
        g.piece = { ...g.piece, shape: rotated, c: g.piece.c + kick }
        render()
        return
      }
    }
  }

  function softDrop() {
    stepDown()
  }

  function hardDrop() {
    const g = G.current
    if (!g.piece || phaseRef.current !== 'playing') return
    let nr = g.piece.r
    while (fits(g.board, g.piece.shape, nr + 1, g.piece.c)) nr++
    g.score += (nr - g.piece.r) * 2
    g.piece = { ...g.piece, r: nr }
    commitPiece()
  }

  /* ── Build display board (current piece + ghost) ── */
  const g = G.current
  const display = g.board.map(r => [...r])

  if (g.piece && phase === 'playing') {
    // Ghost
    let ghostR = g.piece.r
    while (fits(g.board, g.piece.shape, ghostR + 1, g.piece.c)) ghostR++
    g.piece.shape.forEach((row, dr) => {
      row.forEach((v, dc) => {
        if (v) {
          const nr = ghostR + dr, nc = g.piece.c + dc
          if (nr >= 0 && nr < ROWS && !display[nr][nc]) display[nr][nc] = 'ghost'
        }
      })
    })
    // Piece
    g.piece.shape.forEach((row, dr) => {
      row.forEach((v, dc) => {
        if (v) {
          const nr = g.piece.r + dr, nc = g.piece.c + dc
          if (nr >= 0 && nr < ROWS) display[nr][nc] = g.piece.color
        }
      })
    })
  }

  /* ── Render ─────────────────────────────────── */

  // Level select screen
  if (phase === 'select') {
    return (
      <div style={styles.screen}>
        <div style={styles.selectWrap}>
          <div style={styles.selectTitle}>Tetris</div>
          <div style={styles.selectSub}>Choose difficulty</div>
          <div style={styles.levelList}>
            {Object.entries(LEVELS).map(([key, cfg]) => (
              <button key={key} onClick={() => startGame(key)} style={{ ...styles.levelBtn, borderColor: cfg.color }}>
                <div style={{ ...styles.levelDot, background: cfg.color }} />
                <div>
                  <div style={{ ...styles.levelName, color: cfg.color }}>{cfg.label}</div>
                  <div style={styles.levelSpeed}>
                    {key === 'easy' ? 'Relaxed pace' : key === 'medium' ? 'Standard speed' : 'Maximum speed'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const boardW = COLS * CELL
  const boardH = ROWS * CELL

  return (
    <div style={styles.screen}>
      {/* Score bar */}
      <div style={{ ...styles.scoreBar, background: LEVELS[difficulty]?.color || '#5856D6' }}>
        <ScoreChip label="Score" value={g.score} />
        <ScoreChip label="Level" value={g.level} />
        <ScoreChip label="Lines" value={g.lines} />
      </div>

      <div style={styles.gameRow}>
        {/* Board */}
        <div style={{ ...styles.board, width: boardW, height: boardH }}>
          {display.map((row, r) =>
            row.map((color, c) => (
              <div key={`${r}-${c}`} style={{
                position: 'absolute',
                top: r * CELL, left: c * CELL,
                width: CELL - 1, height: CELL - 1,
                background: color === 'ghost'
                  ? 'rgba(255,255,255,0.1)'
                  : color || 'transparent',
                borderRadius: color && color !== 'ghost' ? 3 : 0,
                boxShadow: color && color !== 'ghost'
                  ? 'inset 2px 2px 0 rgba(255,255,255,0.3), inset -1px -1px 0 rgba(0,0,0,0.25)'
                  : 'none',
              }} />
            ))
          )}

          {/* Overlay for game over */}
          {phase === 'over' && (
            <div style={styles.overlay}>
              <div style={styles.overlayTitle}>Game Over</div>
              <div style={styles.overlayScore}>Score: {g.score}</div>
              <button onClick={restart} style={styles.overlayBtn}>Play Again</button>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div style={styles.side}>
          <div style={styles.nextBox}>
            <div style={styles.nextLabel}>NEXT</div>
            <MiniPiece piece={g.next} />
          </div>
          <div style={styles.diffBox}>
            <div style={{ ...styles.diffDot, background: LEVELS[difficulty]?.color }} />
            <div style={{ fontSize: 12, color: '#3C3C43', fontWeight: 600 }}>
              {LEVELS[difficulty]?.label}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {phase === 'playing' && (
        <div style={styles.controls}>
          {/* Top row: rotate */}
          <div style={styles.ctrlRow}>
            <Btn label="Rotate" onPress={rotatePiece} color="#5856D6" wide />
          </div>
          {/* Bottom row: left / drop / right */}
          <div style={styles.ctrlRow}>
            <Btn label="◀" onPress={moveLeft}  color="#007AFF" />
            <Btn label="Drop" onPress={hardDrop} color="#FF3B30" />
            <Btn label="▶" onPress={moveRight} color="#007AFF" />
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────── */
function ScoreChip({ label, value }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{value}</div>
    </div>
  )
}

function MiniPiece({ piece }) {
  if (!piece) return <div style={{ width: 56, height: 44 }} />
  const sz = 11
  const w = piece.shape[0].length
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 44 }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${w}, ${sz}px)`, gap: 1 }}>
        {piece.shape.flat().map((v, i) => (
          <div key={i} style={{
            width: sz, height: sz,
            background: v ? piece.color : 'transparent',
            borderRadius: v ? 2 : 0,
          }} />
        ))}
      </div>
    </div>
  )
}

function Btn({ label, onPress, color, wide }) {
  return (
    <button
      onPointerDown={e => { e.preventDefault(); onPress() }}
      style={{
        flex: wide ? 1 : undefined,
        minWidth: wide ? undefined : 76,
        padding: '16px 12px',
        background: color,
        color: '#fff',
        border: 'none',
        borderRadius: 14,
        fontSize: wide ? 16 : 18,
        fontWeight: 700,
        cursor: 'pointer',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        boxShadow: '0 3px 8px rgba(0,0,0,0.18)',
      }}
    >
      {label}
    </button>
  )
}

/* ── Styles ─────────────────────────────────────────────────── */
const styles = {
  screen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#F2F2F7',
    minHeight: '100%',
    paddingBottom: 24,
  },
  scoreBar: {
    width: '100%',
    padding: '14px 20px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  gameRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    padding: '0 14px',
  },
  board: {
    background: '#111',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    border: '2px solid #333',
  },
  side: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    flexShrink: 0,
    paddingTop: 4,
  },
  nextBox: {
    background: '#fff',
    borderRadius: 12,
    padding: '10px 12px',
  },
  nextLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  diffBox: {
    background: '#fff',
    borderRadius: 12,
    padding: '10px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  diffDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  controls: {
    marginTop: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    padding: '0 14px',
  },
  ctrlRow: {
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.78)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    borderRadius: 8,
  },
  overlayTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 700,
  },
  overlayScore: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  },
  overlayBtn: {
    background: '#007AFF',
    color: '#fff',
    border: 'none',
    borderRadius: 22,
    padding: '13px 36px',
    fontSize: 17,
    fontWeight: 700,
    cursor: 'pointer',
  },
  selectWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px 20px 20px',
    width: '100%',
  },
  selectTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: '#000',
    letterSpacing: -1,
    marginBottom: 6,
  },
  selectSub: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 32,
  },
  levelList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    width: '100%',
    maxWidth: 320,
  },
  levelBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: '#fff',
    border: '2px solid',
    borderRadius: 16,
    padding: '16px 20px',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
  },
  levelDot: {
    width: 14,
    height: 14,
    borderRadius: 50,
    flexShrink: 0,
  },
  levelName: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 2,
  },
  levelSpeed: {
    fontSize: 13,
    color: '#8E8E93',
  },
}
