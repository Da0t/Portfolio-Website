import { useCallback, useEffect, useRef, useState } from 'react'
import './BootScreen.css'

const BIOS_MS = 180
const BOOT_MS = 600
const FADE_MS = 90

export default function BootScreen({ onDone }) {
  const [phase, setPhase] = useState('bios')
  const onDoneRef = useRef(onDone)
  const timersRef = useRef([])
  const completedRef = useRef(false)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  const complete = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    setPhase('fade')
    timersRef.current.push(window.setTimeout(() => onDoneRef.current(), FADE_MS))
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      complete()
      return undefined
    }

    timersRef.current.push(window.setTimeout(() => setPhase('logo'), BIOS_MS))
    timersRef.current.push(window.setTimeout(complete, BOOT_MS))
    window.addEventListener('keydown', complete)

    return () => {
      timersRef.current.forEach(window.clearTimeout)
      window.removeEventListener('keydown', complete)
    }
  }, [complete])

  return (
    <div
      className={`boot-screen boot-${phase}`}
      role="status"
      aria-label="Starting Dat Nguyen's portfolio"
      onPointerDown={complete}
    >
      {phase === 'bios' ? (
        <div className="bios-screen">
          <p>Dat Nguyen Portfolio BIOS v2028.1</p>
          <p>23 projects · 10 awards · 7 roles detected</p>
          <p>Starting Portfolio<span className="bios-blink">_</span></p>
        </div>
      ) : (
        <div className="win95-boot">
          <div className="boot-logo" aria-hidden="true">
            <div className="boot-flag">
              <div className="flag-pane red" />
              <div className="flag-pane green" />
              <div className="flag-pane blue" />
              <div className="flag-pane yellow" />
            </div>
            <div className="boot-wordmark">
              <span>Windows</span>
              <span>95</span>
            </div>
          </div>
          <div className="boot-bar-track" aria-hidden="true">
            <div className="boot-bar-fill" />
          </div>
        </div>
      )}

      <span className="boot-skip">Press any key or click to skip</span>
    </div>
  )
}
