import { useState } from 'react'
import useClock from '../hooks/useClock'
import StartMenu from './StartMenu'
import './Taskbar.css'

export default function Taskbar({ windows, onWindowClick, onStartAction, theme }) {
  const time = useClock()
  const [startOpen, setStartOpen] = useState(false)

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
          onMouseDown={e => e.stopPropagation()}
          onClick={() => setStartOpen(v => !v)}
        >
          <img src="/icons/windows-flag.svg" alt="" className="start-flag" />
          <strong>Start</strong>
        </button>

        <div className="taskbar-separator" />

        {/* Window buttons */}
        <div className="taskbar-windows">
          {windows.map(w => (
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
