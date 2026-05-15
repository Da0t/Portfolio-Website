import { useEffect, useRef } from 'react'

export default function Win10Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, animId, frame = 0

    function init() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    init()
    window.addEventListener('resize', init)

    function drawHero() {
      frame++

      // Dark background gradient
      const bg = ctx.createRadialGradient(W * 0.65, H * 0.5, 0, W * 0.65, H * 0.5, W * 0.8)
      bg.addColorStop(0,   '#0B3D6E')
      bg.addColorStop(0.4, '#062040')
      bg.addColorStop(1,   '#020C18')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // Subtle light rays from center-right
      const cx = W * 0.62, cy = H * 0.5
      const rayCount = 14
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + frame * 0.0008
        const len   = W * 0.85
        const grad  = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * len, cy + Math.sin(angle) * len)
        grad.addColorStop(0,   'rgba(0,120,212,0.07)')
        grad.addColorStop(0.5, 'rgba(0,120,212,0.03)')
        grad.addColorStop(1,   'rgba(0,120,212,0)')
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        const spread = (Math.PI * 2) / rayCount / 2
        ctx.arc(cx, cy, len, angle - spread, angle + spread)
        ctx.closePath()
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Windows 10 logo — 4-pane flag outline, glowing
      const logoX = W * 0.62, logoY = H * 0.5
      const logoSize = Math.min(W, H) * 0.22
      const gap = logoSize * 0.06
      const pane = (logoSize - gap) / 2

      // Glow
      const glow = ctx.createRadialGradient(logoX, logoY, 0, logoX, logoY, logoSize * 0.9)
      glow.addColorStop(0,   'rgba(0,162,255,0.18)')
      glow.addColorStop(0.5, 'rgba(0,120,212,0.08)')
      glow.addColorStop(1,   'rgba(0,120,212,0)')
      ctx.fillStyle = glow
      ctx.fillRect(logoX - logoSize, logoY - logoSize, logoSize * 2, logoSize * 2)

      // The 4 panes — skewed to match the Win10 logo perspective
      const skew = logoSize * 0.07
      const alpha = 0.55 + Math.sin(frame * 0.012) * 0.06

      function drawPane(ox, oy, color) {
        ctx.beginPath()
        ctx.moveTo(ox + skew, oy)
        ctx.lineTo(ox + pane + skew, oy)
        ctx.lineTo(ox + pane, oy + pane)
        ctx.lineTo(ox, oy + pane)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
      }

      const halfG = gap / 2
      // Top-left
      drawPane(logoX - pane - halfG - skew, logoY - pane - halfG, `rgba(0,162,255,${alpha})`)
      // Top-right
      drawPane(logoX + halfG - skew * 0.5, logoY - pane - halfG, `rgba(0,140,230,${alpha * 0.9})`)
      // Bottom-left
      drawPane(logoX - pane - halfG - skew * 0.3, logoY + halfG, `rgba(0,120,212,${alpha * 0.85})`)
      // Bottom-right
      drawPane(logoX + halfG, logoY + halfG, `rgba(0,100,190,${alpha * 0.8})`)

      // Subtle horizontal light sweep
      const sweepAlpha = (Math.sin(frame * 0.008) * 0.5 + 0.5) * 0.04
      const sweep = ctx.createLinearGradient(0, H * 0.3, 0, H * 0.7)
      sweep.addColorStop(0,   'rgba(0,162,255,0)')
      sweep.addColorStop(0.5, `rgba(0,162,255,${sweepAlpha})`)
      sweep.addColorStop(1,   'rgba(0,162,255,0)')
      ctx.fillStyle = sweep
      ctx.fillRect(0, 0, W, H)

      animId = requestAnimationFrame(drawHero)
    }

    drawHero()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, display: 'block' }}
    />
  )
}
