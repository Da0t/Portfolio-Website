import { useState, useEffect } from 'react'
import StartMenu from './StartMenu'
import './Taskbar.css'

export default function Taskbar({ windows, onWindowClick, onStartAction, theme }) {
  const [time, setTime] = useState(getTime())
  const [startOpen, setStartOpen] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTime(getTime()), 1000)
    return () => clearInterval(t)
  }, [])

  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {startOpen && (
        <StartMenu
          onClose={() => setStartOpen(false)}
          onAction={(action) => { setStartOpen(false); onStartAction?.(action) }}
          theme={theme}
        />
      )}
      <div className="taskbar raised">
        {/* Start button */}
        <button
          className={`btn95 start-btn ${startOpen ? 'pressed' : ''}`}
          onClick={() => setStartOpen(v => !v)}
        >
          <img src="/icons/windows-flag.svg" alt="" className="start-flag" />
          <strong>Start</strong>
        </button>

        <div className="taskbar-separator" />

        {/* Window buttons */}
        <div className="taskbar-windows">
          {windows.filter(w => !w.isMinimized || true).map(w => (
            <button
              key={w.id}
              className={`btn95 taskbar-win-btn ${w.isActive ? 'pressed' : ''}`}
              onClick={() => onWindowClick(w.id)}
              title={w.title}
            >
              {w.icon && <img src={w.icon} alt="" className="taskbar-win-icon" />}
              <span>{w.title}</span>
            </button>
          ))}
        </div>

        {/* System tray */}
        <div className="systray inset">
          <span className="systray-time">{time}</span>
        </div>
      </div>
    </>
  )
}
