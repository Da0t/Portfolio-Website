import { useState, useEffect, useCallback, useRef } from 'react'

const COLS = 10
const ROWS = 20
const TICK_MS = 500

const PIECES = [
  { shape: [[1,1,1,1]], color: '#00BCD4' },           // I
  { shape: [[1,1],[1,1]], color: '#FFD600' },           // O
  { shape: [[0,1,0],[1,1,1]], color: '#9C27B0' },       // T
  { shape: [[1,0,0],[1,1,1]], color: '#2196F3' },       // J
  { shape: [[0,0,1],[1,1,1]], color: '#FF9800' },       // L
  { shape: [[0,1,1],[1,1,0]], color: '#4CAF50' },       // S
  { shape: [[1,1,0],[0,1,1]], color: '#F44336' },       // Z
]

function emptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null))
}

function randomPiece() {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)]
  return {
    shape: p.shape,
    color: p.color,
    r: 0,
    c: Math.floor((COLS - p.shape[0].length) / 2),
  }
}

function rotate(shape) {
  return shape[0].map((_, ci) => shape.map(row => row[ci]).reverse())
}

function fits(board, shape, r, c) {
  for (let dr = 0; dr < shape.length; dr++) {
    for (let dc = 0; dc < shape[dr].length; dc++) {
      if (!shape[dr][dc]) continue
      const nr = r + dr, nc = c + dc
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return false
      if (board[nr][nc]) return false
    }
  }
  return true
}

function lock(board, piece) {
  const b = board.map(r => [...r])
  for (let dr = 0; dr < piece.shape.length; dr++) {
    for (let dc = 0; dc < piece.shape[dr].length; dc++) {
      if (piece.shape[dr][dc]) {
        b[piece.r + dr][piece.c + dc] = piece.color
      }
    }
  }
  return b
}

function clearLines(board) {
  const kept = board.filter(row => row.some(c => !c))
  const cleared = ROWS - kept.length
  const empty = Array.from({ length: cleared }, () => Array(COLS).fill(null))
  return { board: [...empty, ...kept], cleared }
}

const SCORE_TABLE = [0, 100, 300, 500, 800]

const CELL_SIZE = 28

export default function TetrisContent() {
  const [board, setBoard] = useState(emptyBoard)
  const [piece, setPiece] = useState(null)
  const [next, setNext] = useState(null)
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [level, setLevel] = useState(1)
  const [phase, setPhase] = useState('idle') // idle | playing | over
  const tickRef = useRef(null)

  const spawnPiece = useCallback((b, nextP) => {
    const p = nextP || randomPiece()
    const n = randomPiece()
    if (!fits(b, p.shape, p.r, p.c)) {
      setPhase('over')
      return
    }
    setPiece(p)
    setNext(n)
  }, [])

  const tick = useCallback(() => {
    setPiece(prev => {
      if (!prev) return prev
      const nr = prev.r + 1
      if (fits(prev.shape ? prev.shape : [], prev.shape, nr, prev.c)) {
        // we need board here — use functional update via ref
        return { ...prev, r: nr }
      }
      return prev // will be handled separately
    })
  }, [])

  // Separate effect to handle locking when piece can't move down
  const boardRef = useRef(emptyBoard())
  const pieceRef = useRef(null)
  const nextRef = useRef(null)
  const phaseRef = useRef('idle')

  useEffect(() => { boardRef.current = board }, [board])
  useEffect(() => { pieceRef.current = piece }, [piece])
  useEffect(() => { nextRef.current = next }, [next])
  useEffect(() => { phaseRef.current = phase }, [phase])

  const step = useCallback(() => {
    const p = pieceRef.current
    const b = boardRef.current
    if (!p) return

    const nr = p.r + 1
    if (fits(b, p.shape, nr, p.c)) {
      setPiece({ ...p, r: nr })
    } else {
      const locked = lock(b, p)
      const { board: cleared, cleared: n } = clearLines(locked)
      setBoard(cleared)
      boardRef.current = cleared
      setLines(l => {
        const nl = l + n
        setLevel(Math.floor(nl / 10) + 1)
        return nl
      })
      setScore(s => s + SCORE_TABLE[n] * Math.floor(lines / 10 + 1))
      const nextP = nextRef.current || randomPiece()
      const freshNext = randomPiece()
      if (!fits(cleared, nextP.shape, nextP.r, nextP.c)) {
        setPhase('over')
        setPiece(null)
        clearInterval(tickRef.current)
      } else {
        setPiece(nextP)
        setNext(freshNext)
      }
    }
  }, [lines])

  useEffect(() => {
    if (phase !== 'playing') {
      clearInterval(tickRef.current)
      return
    }
    const speed = Math.max(100, TICK_MS - (level - 1) * 40)
    clearInterval(tickRef.current)
    tickRef.current = setInterval(step, speed)
    return () => clearInterval(tickRef.current)
  }, [phase, level, step])

  function start() {
    const b = emptyBoard()
    const p = randomPiece()
    const n = randomPiece()
    setBoard(b)
    boardRef.current = b
    setPiece(p)
    setNext(n)
    setScore(0)
    setLines(0)
    setLevel(1)
    setPhase('playing')
  }

  function move(dc) {
    setPiece(p => {
      if (!p) return p
      const nc = p.c + dc
      if (fits(boardRef.current, p.shape, p.r, nc)) return { ...p, c: nc }
      return p
    })
  }

  function rotatePiece() {
    setPiece(p => {
      if (!p) return p
      const rotated = rotate(p.shape)
      if (fits(boardRef.current, rotated, p.r, p.c)) return { ...p, shape: rotated }
      // wall kick
      if (fits(boardRef.current, rotated, p.r, p.c + 1)) return { ...p, shape: rotated, c: p.c + 1 }
      if (fits(boardRef.current, rotated, p.r, p.c - 1)) return { ...p, shape: rotated, c: p.c - 1 }
      return p
    })
  }

  function hardDrop() {
    setPiece(p => {
      if (!p) return p
      let nr = p.r
      while (fits(boardRef.current, p.shape, nr + 1, p.c)) nr++
      // trigger lock on next step by placing at bottom
      const dropped = { ...p, r: nr }
      const locked = lock(boardRef.current, dropped)
      const { board: cleared, cleared: n } = clearLines(locked)
      setBoard(cleared)
      boardRef.current = cleared
      setLines(l => {
        const nl = l + n
        setLevel(Math.floor(nl / 10) + 1)
        return nl
      })
      setScore(s => s + SCORE_TABLE[n] * Math.floor(lines / 10 + 1) + (nr - p.r) * 2)
      const nextP = nextRef.current || randomPiece()
      const freshNext = randomPiece()
      if (!fits(cleared, nextP.shape, nextP.r, nextP.c)) {
        setPhase('over')
        clearInterval(tickRef.current)
        return null
      }
      setPiece(nextP)
      setNext(freshNext)
      return null
    })
  }

  // Render board with current piece overlaid
  const display = board.map(r => [...r])
  if (piece) {
    for (let dr = 0; dr < piece.shape.length; dr++) {
      for (let dc = 0; dc < piece.shape[dr].length; dc++) {
        if (piece.shape[dr][dc]) {
          const nr = piece.r + dr, nc = piece.c + dc
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            display[nr][nc] = piece.color
          }
        }
      }
    }
  }

  // Ghost piece
  if (piece && phase === 'playing') {
    let ghostR = piece.r
    while (fits(boardRef.current, piece.shape, ghostR + 1, piece.c)) ghostR++
    for (let dr = 0; dr < piece.shape.length; dr++) {
      for (let dc = 0; dc < piece.shape[dr].length; dc++) {
        if (piece.shape[dr][dc]) {
          const nr = ghostR + dr, nc = piece.c + dc
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !display[nr][nc]) {
            display[nr][nc] = 'ghost'
          }
        }
      }
    }
  }

  const boardW = COLS * CELL_SIZE
  const boardH = ROWS * CELL_SIZE

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#F2F2F7',
      paddingBottom: 32,
      minHeight: '100%',
    }}>
      {/* Header */}
      <div style={{
        width: '100%',
        background: 'linear-gradient(145deg,#5856D6,#AF52DE)',
        padding: '16px 20px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <ScoreBox label="Score" value={score} />
        <ScoreBox label="Level" value={level} />
        <ScoreBox label="Lines" value={lines} />
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '0 16px' }}>
        {/* Board */}
        <div style={{
          width: boardW,
          height: boardH,
          background: '#111',
          border: '2px solid #333',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          flexShrink: 0,
        }}>
          {display.map((row, r) =>
            row.map((color, c) => (
              <div key={`${r}-${c}`} style={{
                position: 'absolute',
                top: r * CELL_SIZE,
                left: c * CELL_SIZE,
                width: CELL_SIZE - 1,
                height: CELL_SIZE - 1,
                background: color === 'ghost' ? 'rgba(255,255,255,0.12)' : (color || 'transparent'),
                borderRadius: 2,
                boxShadow: color && color !== 'ghost'
                  ? `inset 2px 2px 0 rgba(255,255,255,0.3), inset -1px -1px 0 rgba(0,0,0,0.35)`
                  : 'none',
              }} />
            ))
          )}

          {/* Overlay for idle/over */}
          {phase !== 'playing' && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.75)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 16,
            }}>
              <div style={{ fontSize: 40 }}>{phase === 'over' ? '💀' : '🎮'}</div>
              <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>
                {phase === 'over' ? 'Game Over' : 'Tetris'}
              </div>
              {phase === 'over' && (
                <div style={{ color: '#ccc', fontSize: 14 }}>Score: {score}</div>
              )}
              <button onClick={start} style={{
                background: '#5856D6',
                color: '#fff',
                border: 'none',
                borderRadius: 22,
                padding: '12px 32px',
                fontSize: 17,
                fontWeight: 700,
                cursor: 'pointer',
              }}>
                {phase === 'over' ? 'Play Again' : 'Start'}
              </button>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
          {/* Next piece */}
          <div style={{
            background: '#fff',
            borderRadius: 10,
            padding: '10px 12px',
          }}>
            <div style={{ fontSize: 11, color: '#8E8E93', marginBottom: 6, fontWeight: 600 }}>NEXT</div>
            <MiniPiece piece={next} />
          </div>

          {/* Controls hint */}
          <div style={{
            background: '#fff',
            borderRadius: 10,
            padding: '10px 12px',
            fontSize: 11,
            color: '#8E8E93',
            lineHeight: 1.7,
          }}>
            <div style={{ fontWeight: 700, color: '#3C3C43', marginBottom: 4 }}>Controls</div>
            <div>◀ ▶ Move</div>
            <div>↻ Rotate</div>
            <div>▼ Drop</div>
          </div>
        </div>
      </div>

      {/* Touch controls */}
      {phase === 'playing' && (
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          <button onClick={rotatePiece} style={ctrlBtn('#5856D6')}>↻ Rotate</button>
          <div style={{ display: 'flex', gap: 16 }}>
            <button onClick={() => move(-1)} style={ctrlBtn('#007AFF')}>◀ Left</button>
            <button onClick={hardDrop} style={ctrlBtn('#FF3B30')}>▼ Drop</button>
            <button onClick={() => move(1)} style={ctrlBtn('#007AFF')}>▶ Right</button>
          </div>
        </div>
      )}
    </div>
  )
}

function ctrlBtn(bg) {
  return {
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '14px 22px',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    minWidth: 88,
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
  }
}

function ScoreBox({ label, value }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}>{label}</div>
      <div style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>{value}</div>
    </div>
  )
}

function MiniPiece({ piece }) {
  if (!piece) return <div style={{ width: 60, height: 60 }} />
  const h = piece.shape.length
  const w = piece.shape[0].length
  const sz = 12
  return (
    <div style={{ width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${w}, ${sz}px)`, gap: 1 }}>
        {piece.shape.flat().map((v, i) => (
          <div key={i} style={{
            width: sz, height: sz,
            background: v ? piece.color : 'transparent',
            borderRadius: 1,
          }} />
        ))}
      </div>
    </div>
  )
}
