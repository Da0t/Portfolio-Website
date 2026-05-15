import { useState, useEffect } from 'react'
import './WindowsUpdate.css'

const STAGES = [
  { label: 'Connecting to Windows Update...', duration: 900 },
  { label: 'Checking installed components...', duration: 700 },
  { label: 'Downloading Windows 2000 Professional (1 of 3)...', duration: 1100 },
  { label: 'Downloading Windows 2000 Professional (2 of 3)...', duration: 1000 },
  { label: 'Downloading Windows 2000 Professional (3 of 3)...', duration: 900 },
  { label: 'Installing update. Do not turn off your computer.', duration: 1200 },
  { label: 'Applying system settings...', duration: 700 },
  { label: 'Restarting...', duration: 600 },
]

export default function WindowsUpdate({ onDone }) {
  const versionLabel = 'Windows 2000 Professional'
  const [stage, setStage]     = useState(0)
  const [progress, setProgress] = useState(0)
  const [restarting, setRestarting] = useState(false)

  // Advance through stages
  useEffect(() => {
    if (stage >= STAGES.length) return
    const t = setTimeout(() => setStage(s => s + 1), STAGES[stage].duration)
    return () => clearTimeout(t)
  }, [stage])

  // Smooth progress bar
  useEffect(() => {
    const target = Math.round((stage / STAGES.length) * 100)
    const step = () => {
      setProgress(p => {
        if (p >= target) return p
        return Math.min(p + 1, target)
      })
    }
    const t = setInterval(step, 18)
    return () => clearInterval(t)
  }, [stage])

  // When all stages done → flash screen, call onDone
  useEffect(() => {
    if (stage < STAGES.length) return
    setRestarting(true)
    const t = setTimeout(onDone, 1200)
    return () => clearTimeout(t)
  }, [stage, onDone])

  const currentLabel = STAGES[Math.min(stage, STAGES.length - 1)].label

  return (
    <div className={`wu-overlay ${restarting ? 'wu-restart' : ''}`}>
      {!restarting && (
        <div className="wu-dialog raised">
          {/* Title bar */}
          <div className="titlebar titlebar-active">
            <span className="titlebar-title">Windows Update</span>
          </div>

          <div className="wu-body">
            {/* Left brand panel */}
            <div className="wu-brand">
              <div className="wu-logo-text">
                <span className="wu-windows-word">Windows</span>
                <span className="wu-update-word">Update</span>
              </div>
              <div className="wu-version-text">Installing {versionLabel}</div>
            </div>

            {/* Right content */}
            <div className="wu-content">
              <div className="wu-stage-label">{currentLabel}</div>

              {/* Progress bar */}
              <div className="wu-bar-track">
                <div className="wu-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="wu-percent">{progress}%</div>

              <div className="wu-warning">
                ⚠ Do not interrupt this process. Your computer will restart automatically.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
