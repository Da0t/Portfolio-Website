import { useEffect, useRef } from 'react'
import './DesktopContextMenu.css'

export default function DesktopContextMenu({ x, y, onClose, onAction }) {
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    // slight delay so the right-click that opened it doesn't immediately close it
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 0)
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler) }
  }, [onClose])

  // Keep menu on-screen
  const style = {
    left: Math.min(x, window.innerWidth  - 180),
    top:  Math.min(y, window.innerHeight - 160),
  }

  function item(label, action, disabled = false) {
    return (
      <div
        className={`ctx-item ${disabled ? 'ctx-item-disabled' : ''}`}
        onClick={() => { if (!disabled) { onAction(action); onClose() } }}
      >
        {label}
      </div>
    )
  }

  return (
    <div className="ctx-menu raised" style={style} ref={ref}>
      <div className="ctx-label">Arrange Icons</div>
      <div className="menu-separator95" />
      {item('By Name', 'arrange-name')}
      {item('By Type', 'arrange-type')}
      <div className="menu-separator95" />
      {item('Line Up Icons', 'lineup')}
      {item('Auto Arrange', 'auto-arrange')}
      <div className="menu-separator95" />
      {item('Refresh', 'refresh')}
    </div>
  )
}
