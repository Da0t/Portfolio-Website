import { useState } from 'react'
import './Win2000Welcome.css'

const panels = {
  start: {
    heading: 'Getting Started',
    body: 'Your computer has been upgraded to Windows 2000 Professional. Use the links on the left to explore what\'s new.',
  },
  register: {
    heading: 'Register Now',
    body: 'Register your copy of Windows 2000 to receive product support and important updates from Microsoft. (Just kidding — you\'re already on Dat\'s portfolio.)',
  },
  discover: {
    heading: 'Discover Windows 2000',
    body: 'Windows 2000 Professional brings improved stability, security, and a refined interface to your desktop. Built on the NT kernel — no more blue screens. Probably.',
  },
  connect: {
    heading: 'Connect to the Internet',
    body: 'Use the Internet Connection Wizard to set up your internet connection. Or just look around — you\'re already connected. Dat\'s portfolio is loading at full speed.',
  },
}

export default function Win2000Welcome({ onClose }) {
  const [active, setActive] = useState('start')
  const panel = panels[active]

  return (
    <div className="w2k-overlay">
      <div className="w2k-dialog raised">
        {/* Title bar */}
        <div className="titlebar titlebar-active">
          <img src="/icons/welcome.svg" alt="" className="titlebar-icon" />
          <span className="titlebar-title">Getting Started with Windows 2000</span>
          <div className="titlebar-buttons">
            <button className="btn95 titlebar-btn" onClick={onClose} title="Close">
              <svg width="8" height="8" viewBox="0 0 8 8">
                <line x1="0" y1="0" x2="8" y2="8" stroke="black" strokeWidth="1.5"/>
                <line x1="8" y1="0" x2="0" y2="8" stroke="black" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Blue header with logo */}
        <div className="w2k-header">
          <div className="w2k-header-left">
            <span className="w2k-ms">Microsoft®</span>
          </div>
          <div className="w2k-header-right">
            <span className="w2k-title-text">
              <em>Windows</em> <strong>2000</strong>
            </span>
            <span className="w2k-subtitle">Professional</span>
          </div>
        </div>

        {/* Body: sidebar + content */}
        <div className="w2k-body">
          {/* Sidebar nav */}
          <div className="w2k-sidebar">
            {Object.entries(panels).map(([key, p]) => (
              <div
                key={key}
                className={`w2k-nav-item ${active === key ? 'w2k-nav-active' : ''}`}
                onClick={() => setActive(key)}
              >
                {p.heading}
              </div>
            ))}
          </div>

          {/* Content pane */}
          <div className="w2k-content">
            <div className="w2k-content-heading">{panel.heading}</div>

            {active === 'start' && (
              <div className="w2k-start-row">
                <img src="/icons/computer.svg" alt="" className="w2k-content-icon" />
                <div className="w2k-content-body">
                  <p>{panel.body}</p>
                </div>
              </div>
            )}
            {active !== 'start' && (
              <p className="w2k-content-body">{panel.body}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="w2k-footer">
          <label className="w2k-checkbox-label">
            <input type="checkbox" defaultChecked className="w2k-checkbox" />
            <span>Show this screen at startup</span>
          </label>
          <button className="btn95" onClick={onClose}>Exit</button>
        </div>
      </div>
    </div>
  )
}
