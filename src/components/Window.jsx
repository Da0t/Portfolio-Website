import { useRef, useState } from 'react'
import Draggable from 'react-draggable'
import './Window.css'

export default function Window({
  id,
  title,
  icon,
  children,
  isActive,
  isMinimized,
  isMaximized,
  defaultPosition,
  defaultSize,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  zIndex,
  menuBar,
  statusBar,
}) {
  const nodeRef = useRef(null)
  const [pos, setPos] = useState(defaultPosition ?? { x: 100, y: 80 })
  const [preMaxPos, setPreMaxPos] = useState(null)

  if (isMinimized) return null

  function handleMaximize() {
    if (!isMaximized) {
      setPreMaxPos(pos)
      setPos({ x: 0, y: 0 })
    } else {
      setPos(preMaxPos ?? (defaultPosition ?? { x: 100, y: 80 }))
    }
    onMaximize()
  }

  const width  = isMaximized ? '100%' : (defaultSize?.w ?? 500)
  const height = isMaximized ? 'calc(100vh - 28px)' : (defaultSize?.h ?? 380)

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".titlebar"
      position={pos}
      onStop={(_, data) => setPos({ x: data.x, y: data.y })}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className={`window95 raised ${isActive ? 'active' : 'inactive'}`}
        style={{ width, height, zIndex, position: 'absolute' }}
        onPointerDown={onFocus}
      >
        <div className={`titlebar ${isActive ? 'titlebar-active' : 'titlebar-inactive'}`}>
          {icon && <img src={icon} alt="" className="titlebar-icon" draggable={false} />}
          <span className="titlebar-title">{title}</span>
          <div className="titlebar-buttons">
            <button className="btn95 titlebar-btn" onClick={onMinimize} title="Minimize">
              <MinimizeIcon />
            </button>
            <button className="btn95 titlebar-btn" onClick={handleMaximize} title="Maximize/Restore">
              {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
            </button>
            <button className="btn95 titlebar-btn titlebar-close" onClick={onClose} title="Close">
              <CloseIcon />
            </button>
          </div>
        </div>
        {menuBar && <div className="menubar95">{menuBar}</div>}
        <div className="window-content">{children}</div>
        {statusBar && (
          <div className="statusbar95 inset">
            <span>{statusBar}</span>
          </div>
        )}
      </div>
    </Draggable>
  )
}

function MinimizeIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <rect x="0" y="6" width="8" height="2" fill="black" />
    </svg>
  )
}

function MaximizeIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <rect x="0" y="0" width="8" height="8" fill="none" stroke="black" strokeWidth="1" />
      <rect x="0" y="0" width="8" height="2" fill="black" />
    </svg>
  )
}

function RestoreIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <rect x="2" y="0" width="6" height="6" fill="none" stroke="black" strokeWidth="1" />
      <rect x="2" y="0" width="6" height="2" fill="black" />
      <rect x="0" y="2" width="6" height="6" fill="var(--gray)" stroke="black" strokeWidth="1" />
      <rect x="0" y="2" width="6" height="2" fill="black" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <line x1="0" y1="0" x2="8" y2="8" stroke="black" strokeWidth="1.5" />
      <line x1="8" y1="0" x2="0" y2="8" stroke="black" strokeWidth="1.5" />
    </svg>
  )
}
