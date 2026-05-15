import { useRef } from 'react'
import Draggable from 'react-draggable'
import './DesktopIcon.css'

export default function DesktopIcon({
  id,
  icon,
  label,
  position,
  selected,
  onSelect,
  onOpen,
  onDragStart,
  onDrag,
  onDragStop,
}) {
  const nodeRef    = useRef(null)
  const didDrag    = useRef(false)

  function handleMouseDown(e) {
    e.stopPropagation()
    didDrag.current = false
    onSelect(id, e.ctrlKey || e.metaKey)
  }

  function handleDoubleClick(e) {
    e.stopPropagation()
    if (!didDrag.current) onOpen?.()
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onStart={(e, data) => {
        e.stopPropagation()
        didDrag.current = false
        onDragStart?.(id, { x: data.x, y: data.y })
      }}
      onDrag={(e, data) => {
        didDrag.current = true
        onDrag?.(id, { x: data.x, y: data.y })
      }}
      onStop={(e, data) => {
        e.stopPropagation()
        onDragStop?.(id, { x: data.x, y: data.y })
      }}
    >
      <div
        ref={nodeRef}
        className={`desktop-icon${selected ? ' selected' : ''}`}
        style={{ position: 'absolute', cursor: 'default' }}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="desktop-icon-img-wrap">
          <img src={icon} alt={label} draggable={false} />
        </div>
        <span className={`desktop-icon-label${selected ? ' selected' : ''}`}>{label}</span>
      </div>
    </Draggable>
  )
}
