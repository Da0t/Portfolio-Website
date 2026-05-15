import { useEffect, useRef } from 'react'

const SCALE = 4 // render at 1/4 res, CSS upscales for pixel-art look

// Bliss hill curve — smooth step between left edge → peak → right edge
// All y values are ratios of H (canvas y=0 is top)
function hillY(xNorm, H) {
  const peakX  = 0.30  // peak is ~30% from left
  const leftY  = 0.62  // hill at left edge  (62% from top)
  const peakY  = 0.42  // hill at peak       (42% from top — highest point visually)
  const rightY = 0.66  // hill at right edge (66% from top)

  let t, ratio
  if (xNorm <= peakX) {
    t = xNorm / peakX
    const s = t * t * (3 - 2 * t) // smoothstep
    ratio = leftY + (peakY - leftY) * s
  } else {
    t = (xNorm - peakX) / (1 - peakX)
    const s = t * t * (3 - 2 * t)
    ratio = peakY + (rightY - peakY) * s
  }
  return Math.floor(ratio * H)
}

function makeClouds(W, H) {
  return [
    { x: W * 0.05, y: Math.floor(H * 0.10), size: 0.9, speed: 0.05 },
    { x: W * 0.30, y: Math.floor(H * 0.06), size: 0.7, speed: 0.04 },
    { x: W * 0.55, y: Math.floor(H * 0.13), size: 1.1, speed: 0.03 },
    { x: W * 0.75, y: Math.floor(H * 0.08), size: 0.6, speed: 0.06 },
    { x: W * 0.90, y: Math.floor(H * 0.16), size: 0.8, speed: 0.04 },
  ]
}

// Pixel cloud — sized in low-res canvas units
function drawCloud(ctx, x, y, size) {
  const u = Math.max(1, Math.round(size * 3))
  // puffs: [dx, dy, w, h] in units
  const puffs = [
    [0, 2, 7, 3],
    [2, 0, 4, 3],
    [5, 1, 5, 3],
    [9, 2, 4, 2],
    [1, 4, 10, 2],
  ]
  ctx.fillStyle = 'rgba(200,220,240,0.55)'
  for (const [dx, dy, w, h] of puffs)
    ctx.fillRect(x + dx * u + 1, y + dy * u + 1, w * u, h * u)
  ctx.fillStyle = '#FFFFFF'
  for (const [dx, dy, w, h] of puffs)
    ctx.fillRect(x + dx * u, y + dy * u, w * u, h * u)
}

function makeBirds(W, H) {
  return Array.from({ length: 4 }, () => ({
    x:     Math.random() * W,
    y:     Math.floor(H * 0.06 + Math.random() * H * 0.20),
    speed: 0.12 + Math.random() * 0.16,
    phase: Math.random() * Math.PI * 2,
  }))
}

function drawBirds(ctx, W, H, frame, birds) {
  ctx.fillStyle = '#1A3A5C'
  for (const b of birds) {
    b.x -= b.speed
    if (b.x < -10) {
      b.x = W + 10
      b.y = Math.floor(H * 0.06 + Math.random() * H * 0.20)
    }
    const up = Math.sin(frame * 0.07 + b.phase) > 0
    ctx.fillRect(b.x - 3, b.y + (up ? -1 : 0), 2, 1)
    ctx.fillRect(b.x + 1, b.y + (up ? -1 : 0), 2, 1)
    ctx.fillRect(b.x - 1, b.y,                  2, 1)
  }
}

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false

    let W, H, clouds, birds

    function init() {
      W = canvas.width  = Math.floor(window.innerWidth  / SCALE)
      H = canvas.height = Math.floor(window.innerHeight / SCALE)
      clouds = makeClouds(W, H)
      birds  = makeBirds(W, H)
    }

    init()
    window.addEventListener('resize', init)

    let frame = 0
    let animId

    function draw() {
      frame++

      // ── Sky gradient ─────────────────────────────────────────────────────
      const hillTop = hillY(0.30, H) // y of the hill peak
      const sky = ctx.createLinearGradient(0, 0, 0, hillTop + 4)
      sky.addColorStop(0,   '#1B6DBF')
      sky.addColorStop(0.5, '#3D96CC')
      sky.addColorStop(1,   '#88CBEA')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, W, H)

      // ── Clouds ───────────────────────────────────────────────────────────
      for (const c of clouds) {
        c.x -= c.speed
        const cw = c.size * 36
        if (c.x + cw < 0) c.x = W + cw
        drawCloud(ctx, Math.floor(c.x), c.y, c.size)
      }

      // ── Birds ────────────────────────────────────────────────────────────
      drawBirds(ctx, W, H, frame, birds)

      // ── Hill fill ────────────────────────────────────────────────────────
      ctx.beginPath()
      ctx.moveTo(0, H)
      for (let x = 0; x <= W; x++) ctx.lineTo(x, hillY(x / W, H))
      ctx.lineTo(W, H)
      ctx.closePath()

      const grad = ctx.createLinearGradient(0, hillTop, 0, H)
      grad.addColorStop(0,    '#78C030') // bright crest — Bliss green
      grad.addColorStop(0.15, '#68AA28')
      grad.addColorStop(0.50, '#559820')
      grad.addColorStop(1,    '#3C7018') // shadowed base
      ctx.fillStyle = grad
      ctx.fill()

      // Right-slope shadow (the Bliss hill is lit from upper-left)
      ctx.beginPath()
      ctx.moveTo(0, H)
      for (let x = 0; x <= W; x++) ctx.lineTo(x, hillY(x / W, H))
      ctx.lineTo(W, H)
      ctx.closePath()
      const shadow = ctx.createLinearGradient(W * 0.28, 0, W, 0)
      shadow.addColorStop(0,   'rgba(0,0,0,0)')
      shadow.addColorStop(1,   'rgba(0,30,0,0.22)')
      ctx.fillStyle = shadow
      ctx.fill()

      // ── Bottom vignette ──────────────────────────────────────────────────
      const vg = ctx.createLinearGradient(0, H - 5, 0, H)
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(1, 'rgba(0,0,0,0.28)')
      ctx.fillStyle = vg
      ctx.fillRect(0, H - 5, W, 5)

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
        imageRendering: 'pixelated',
      }}
    />
  )
}
