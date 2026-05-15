import { useEffect, useRef } from 'react'
import './Win10StartMenu.css'

const tiles = [
  { id: 'about',    label: 'About Me',    color: '#0078D4', size: 'wide',   icon: '/icons/about-win10.svg' },
  { id: 'projects', label: 'Projects',    color: '#E6A500', size: 'medium', icon: '/icons/projects-win10.svg' },
  { id: 'contact',  label: 'Contact Me',  color: '#6B2FA0', size: 'medium', icon: '/icons/contact-win10.svg' },
  { id: 'resume',   label: 'Resume / CV', color: '#0063B1', size: 'wide',   icon: '/icons/resume-win10.svg' },
  { id: 'recycle',  label: 'Recycle Bin', color: '#4A5560', size: 'small',  icon: '/icons/recycle-win10.svg' },
  { id: 'network',  label: 'GitHub',      color: '#1B1B1B', size: 'small',  icon: '/icons/github-win10.svg' },
]

const leftItems = [
  { label: 'About Me',    id: 'about',    icon: '/icons/about-win10.svg' },
  { label: 'Projects',    id: 'projects', icon: '/icons/projects-win10.svg' },
  { label: 'Contact Me',  id: 'contact',  icon: '/icons/contact-win10.svg' },
  { label: 'Resume / CV', id: 'resume',   icon: '/icons/resume-win10.svg' },
]

export default function Win10StartMenu({ onClose, onAction }) {
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    setTimeout(() => document.addEventListener('mousedown', handler), 0)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div className="w10-start" ref={ref}>
      {/* Left panel */}
      <div className="w10-left">
        <div className="w10-user">
          <div className="w10-avatar">D</div>
          <span className="w10-username">Dat Nguyen</span>
        </div>

        <div className="w10-left-label">Most Used</div>
        {leftItems.map(item => (
          <div key={item.id} className="w10-left-item" onClick={() => { onAction(item.id); onClose() }}>
            <img src={item.icon} alt="" className="w10-left-icon-img" />
            <span>{item.label}</span>
          </div>
        ))}

        <div className="w10-left-footer">
          <div className="w10-footer-item" onClick={() => { onAction('shutdown'); onClose() }}>
            <span className="w10-footer-glyph">⏻</span><span>Power</span>
          </div>
        </div>
      </div>

      {/* Right tile panel */}
      <div className="w10-tiles">
        <div className="w10-tiles-label">Dat's Portfolio</div>
        <div className="w10-tile-grid">
          {tiles.map(t => (
            <div
              key={t.id}
              className={`w10-tile w10-tile-${t.size}`}
              style={{ background: t.color }}
              onClick={() => {
                if (t.id === 'network') window.open('https://github.com/Da0t', '_blank', 'noreferrer')
                else onAction(t.id)
                onClose()
              }}
            >
              <img src={t.icon} alt="" className="w10-tile-icon-img" />
              <span className="w10-tile-label">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
