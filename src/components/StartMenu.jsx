import { useEffect, useRef } from 'react'
import './StartMenu.css'

export default function StartMenu({ onClose, onAction, theme }) {
  const ref = useRef(null)

  const items = [
    { label: 'About Me',    action: 'open-about',    icon: '/icons/computer.svg' },
    { label: 'Projects',    action: 'open-projects', icon: '/icons/documents.svg' },
    { label: 'Contact Me',  action: 'open-contact',  icon: '/icons/inbox.svg' },
    { label: 'Resume / CV', action: 'open-resume',   icon: '/icons/briefcase.svg' },
    { separator: true },
    ...(theme === 'win95'
      ? [{ label: 'Windows Update → Win2000', action: 'windows-update', icon: '/icons/welcome.svg', highlight: true }]
      : []),
    { label: 'Shut Down...', action: 'shutdown', icon: '/icons/shutdown.svg' },
  ]

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const sidebarLabel = theme === 'win2000'
    ? <><span>Windows</span><strong>2000</strong></>
    : <><span>Windows</span><strong>95</strong></>

  return (
    <div className="start-menu raised" ref={ref}>
      <div className="start-menu-sidebar">
        <span>{sidebarLabel}</span>
      </div>
      <div className="start-menu-items">
        {items.map((item, i) =>
          item.separator
            ? <div key={i} className="menu-separator95" />
            : (
              <div
                key={i}
                className={`start-menu-item ${item.highlight ? 'start-menu-item-highlight' : ''}`}
                onClick={() => onAction(item.action)}
              >
                <img src={item.icon} alt="" className="start-menu-item-icon" />
                <span>{item.label}</span>
              </div>
            )
        )}
      </div>
    </div>
  )
}
