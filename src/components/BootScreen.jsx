import { useState, useEffect } from 'react'
import './BootScreen.css'

const BOOT_MS = 3200 // total boot duration

export default function BootScreen({ onDone }) {
  const [phase, setPhase] = useState('bios')   // 'bios' | 'logo' | 'bar' | 'done'
  const [barWidth, setBarWidth] = useState(0)
  const [dots, setDots] = useState(0)

  useEffect(() => {
    // Phase 1: BIOS text (800ms)
    const t1 = setTimeout(() => setPhase('logo'), 800)
    // Phase 2: Logo appears (500ms later)
    const t2 = setTimeout(() => setPhase('bar'), 1300)
    // Phase 3: progress bar fills over ~1500ms
    const t3 = setTimeout(() => {
      setPhase('fade')
      setTimeout(onDone, 500)
    }, BOOT_MS)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  // Animate bar
  useEffect(() => {
    if (phase !== 'bar' && phase !== 'fade') return
    const target = phase === 'fade' ? 100 : 92
    const interval = setInterval(() => {
      setBarWidth(w => {
        const next = w + (Math.random() * 6 + 2)
        if (next >= target) { clearInterval(interval); return target }
        return next
      })
    }, 80)
    return () => clearInterval(interval)
  }, [phase])

  // Animate dots on BIOS screen
  useEffect(() => {
    if (phase !== 'bios') return
    const t = setInterval(() => setDots(d => (d + 1) % 4), 200)
    return () => clearInterval(t)
  }, [phase])

  return (
    <div className={`boot-screen ${phase === 'fade' ? 'boot-fade' : ''}`}>
      {phase === 'bios' && (
        <div className="bios-screen">
          <p>Dat Nguyen Portfolio BIOS v2028.1 — UCSD Edition</p>
          <p>Copyright (C) 2024-2028, Dat Nguyen. All rights reserved.</p>
          <br />
          <p>Processor: Python / TypeScript / React @ 100MHz</p>
          <p>Memory Test: 3 Shipped Projects OK · 1 Hackathon Win OK</p>
          <p>Co-Processor: Scikit-Learn / PyTorch / FastAPI detected</p>
          <br />
          <p>Detecting projects{'.'.repeat(dots)}</p>
          <p>Loading UCSD Data Science kernel{'.'.repeat(dots)}</p>
          <br />
          <p>Starting Portfolio<span className="bios-blink">_</span></p>
        </div>
      )}

      {(phase === 'logo' || phase === 'bar') && (
        <div className="win95-boot">
          {/* Windows 95 logo */}
          <div className="boot-logo">
            <div className="boot-flag">
              <div className="flag-pane red" />
              <div className="flag-pane green" />
              <div className="flag-pane blue" />
              <div className="flag-pane yellow" />
            </div>
            <div className="boot-wordmark">
              <span className="boot-windows">Windows</span>
              <span className="boot-95">95</span>
            </div>
          </div>

          {/* Progress bar */}
          {phase === 'bar' && (
            <div className="boot-bar-wrap">
              <div className="boot-bar-track">
                <div className="boot-bar-fill" style={{ width: `${barWidth}%` }} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
