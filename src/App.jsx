import { useState, useEffect, useRef } from 'react'
import useMobile from './hooks/useMobile'
import { getClickSound } from './utils/sound'
import MobileLayout from './mobile/MobileLayout'
import Window from './components/Window'
import DesktopIcon from './components/DesktopIcon'
import Taskbar from './components/Taskbar'
import WelcomeDialog from './components/WelcomeDialog'
import BootScreen from './components/BootScreen'
import WindowsUpdate from './components/WindowsUpdate'
import Win2000Welcome from './components/Win2000Welcome'
import DesktopContextMenu from './components/DesktopContextMenu'
import AboutWindow from './windows/AboutWindow'
import ProjectsWindow from './windows/ProjectsWindow'
import ContactWindow from './windows/ContactWindow'
import ResumeWindow from './windows/ResumeWindow'
import RecycleBinWindow from './windows/RecycleBinWindow'
import ExperienceWindow from './windows/ExperienceWindow'
import MinesweeperWindow from './windows/MinesweeperWindow'
import './App.css'

let nextZ = 100

const ICONS = {
  win95: {
    computer:     '/icons/computer.svg',
    documents:    '/icons/documents.svg',
    inbox:        '/icons/inbox.svg',
    briefcase:    '/icons/briefcase.svg',
    recycle:      '/icons/recycle-bin.svg',
    network:      '/icons/network.svg',
    linkedin:     '/icons/linkedin.svg',
    experience:   '/icons/experience.svg',
    minesweeper:  '/icons/minesweeper.svg',
  },
  win2000: {
    computer:     '/icons/computer-w2k.svg',
    documents:    '/icons/documents-w2k.svg',
    inbox:        '/icons/inbox-w2k.svg',
    briefcase:    '/icons/briefcase-w2k.svg',
    recycle:      '/icons/recycle-bin-w2k.svg',
    network:      '/icons/network-w2k.svg',
    linkedin:     '/icons/linkedin-w2k.svg',
    experience:   '/icons/experience-w2k.svg',
    minesweeper:  '/icons/minesweeper.svg',
  },
}

function getWindowDefs(theme) {
  const ic = ICONS[theme] ?? ICONS.win95
  return {
    about: {
      title: 'About Me — Dat Nguyen',
      icon: ic.computer,
      defaultSize: { w: 500, h: 430 },
      defaultPosition: { x: 120, y: 60 },
      content: <AboutWindow />,
      statusBar: 'Dat Nguyen · UCSD Data Science + Economics · SWE Intern @ SEO',
    },
    projects: {
      title: 'Projects — Dat Nguyen',
      icon: ic.documents,
      defaultSize: { w: 580, h: 390 },
      defaultPosition: { x: 160, y: 80 },
      content: <ProjectsWindow />,
      statusBar: '8 project(s) — double-click to open on GitHub',
    },
    contact: {
      title: 'Inbox — Message Dat',
      icon: ic.inbox,
      defaultSize: { w: 480, h: 360 },
      defaultPosition: { x: 200, y: 100 },
      content: <ContactWindow />,
      statusBar: 'datq.nguyen06@gmail.com',
    },
    resume: {
      title: 'Resume / CV — Dat Nguyen',
      icon: ic.briefcase,
      defaultSize: { w: 520, h: 480 },
      defaultPosition: { x: 180, y: 50 },
      content: <ResumeWindow />,
      statusBar: 'Dat_resume.pdf · Expected Graduation June 2028',
    },
    recycle: {
      title: 'Recycle Bin',
      icon: ic.recycle,
      defaultSize: { w: 520, h: 340 },
      defaultPosition: { x: 220, y: 110 },
      content: <RecycleBinWindow />,
      statusBar: '8 item(s) · Cannot be recovered',
    },
    experience: {
      title: 'Experience — Dat Nguyen',
      icon: ic.experience,
      defaultSize: { w: 560, h: 460 },
      defaultPosition: { x: 140, y: 60 },
      content: <ExperienceWindow />,
      statusBar: '6 roles · Work · Research · Leadership',
    },
    minesweeper: {
      title: 'Minesweeper',
      icon: ic.minesweeper,
      defaultSize: { w: 480, h: 520 },
      defaultPosition: { x: 200, y: 60 },
      content: <MinesweeperWindow />,
      statusBar: 'Beginner · 9×9 · 10 mines · Left-click reveal · Right-click flag',
    },
  }
}

function getDesktopIcons(theme) {
  const ic = ICONS[theme] ?? ICONS.win95
  return [
    { id: 'about',       icon: ic.computer,    label: 'About Me' },
    { id: 'projects',    icon: ic.documents,   label: 'Projects' },
    { id: 'contact',     icon: ic.inbox,       label: 'Contact Me' },
    { id: 'recycle',     icon: ic.recycle,     label: 'Recycle Bin' },
    { id: 'resume',      icon: ic.briefcase,   label: 'Resume / CV' },
    { id: 'network',     icon: ic.network,     label: 'My GitHub' },
    { id: 'linkedin',    icon: ic.linkedin,    label: 'LinkedIn' },
    { id: 'experience',  icon: ic.experience,  label: 'Experience' },
    { id: 'minesweeper', icon: ic.minesweeper, label: 'Minesweeper' },
  ]
}

function makeWindow(id, theme) {
  const def = getWindowDefs(theme)[id]
  if (!def) return null
  return { id, ...def, isMinimized: false, isMaximized: false, isActive: true, zIndex: ++nextZ }
}

// Initial icon grid — left column, 114px vertical spacing
const INITIAL_ICON_POSITIONS = {
  about:        { x: 16, y: 16 },
  projects:     { x: 16, y: 130 },
  experience:   { x: 16, y: 244 },
  contact:      { x: 16, y: 358 },
  resume:       { x: 16, y: 472 },
  recycle:      { x: 16, y: 586 },
  network:      { x: 130, y: 16 },
  linkedin:     { x: 130, y: 130 },
  minesweeper:  { x: 130, y: 244 },
}

// Icon bounding box for hit-testing against selection rect
// Icons are 100px wide, ~112px tall (64px img + gap + ~36px label)
const ICON_W = 100
const ICON_H = 112

function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
}

export default function App() {
  const isMobile = useMobile()
  const [booting, setBooting]               = useState(true)
  const [windows, setWindows]               = useState([])
  const [showWelcome, setShowWelcome]       = useState(false)
  const [theme, setTheme]                   = useState('win95')
  const [updating, setUpdating]             = useState(false)
  const [showW2kWelcome, setShowW2kWelcome] = useState(false)

  // Icon positions (free drag)
  const [iconPositions, setIconPositions] = useState(INITIAL_ICON_POSITIONS)
  // Currently selected icon ids
  const [selectedIcons, setSelectedIcons] = useState(new Set())
  // Rubber-band selection box: { x, y, w, h } in desktop coords, or null
  const [selBox, setSelBox] = useState(null)

  const [contextMenu, setContextMenu] = useState(null) // { x, y } | null

  const desktopRef       = useRef(null)
  const selStart         = useRef(null)   // { x, y } where rubber-band started
  const dragStartPos     = useRef({})     // icon positions at drag start

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Global click sound — desktop only
  useEffect(() => {
    if (isMobile) return
    const handler = () => getClickSound(theme)()
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [theme, isMobile])

  // ── Icon drag & selection ────────────────────────────────────
  function handleIconSelect(id, addToSelection) {
    setSelectedIcons(prev => {
      if (addToSelection) {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
      }
      // If clicking an already-selected icon alone, keep it selected
      if (prev.has(id) && prev.size === 1) return prev
      return new Set([id])
    })
  }

  function handleIconDragStart(id, pos) {
    // Snapshot all current positions at drag start so we can compute deltas
    dragStartPos.current = { ...iconPositions }
    // If the dragged icon isn't selected, select only it
    if (!selectedIcons.has(id)) {
      setSelectedIcons(new Set([id]))
    }
  }

  function handleIconDrag(id, pos) {
    const start = dragStartPos.current[id]
    if (!start) return
    const dx = pos.x - start.x
    const dy = pos.y - start.y

    setIconPositions(prev => {
      const next = { ...prev }
      // Move the dragged icon
      next[id] = pos
      // Move every other selected icon by the same delta
      selectedIcons.forEach(selId => {
        if (selId === id) return
        const selStart = dragStartPos.current[selId]
        if (selStart) {
          next[selId] = {
            x: selStart.x + dx,
            y: selStart.y + dy,
          }
        }
      })
      return next
    })
  }

  function handleIconDragStop(id, pos) {
    dragStartPos.current = {}
  }

  // ── Rubber-band selection box ────────────────────────────────
  function handleDesktopMouseDown(e) {
    // Only start rubber-band if clicking directly on the desktop background
    if (e.target !== desktopRef.current && e.target !== e.currentTarget) return
    if (e.button !== 0) return

    const rect = desktopRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    selStart.current = { x, y }
    setSelBox({ x, y, w: 0, h: 0 })
    if (!e.ctrlKey && !e.metaKey) setSelectedIcons(new Set())

    function onMove(ev) {
      if (!selStart.current) return
      const cx = ev.clientX - rect.left
      const cy = ev.clientY - rect.top
      const bx = Math.min(selStart.current.x, cx)
      const by = Math.min(selStart.current.y, cy)
      const bw = Math.abs(cx - selStart.current.x)
      const bh = Math.abs(cy - selStart.current.y)
      setSelBox({ x: bx, y: by, w: bw, h: bh })

      // Highlight icons that overlap the selection box
      const hit = new Set()
      Object.entries(iconPositions).forEach(([id, pos]) => {
        if (rectsOverlap(bx, by, bw, bh, pos.x, pos.y, ICON_W, ICON_H)) hit.add(id)
      })
      setSelectedIcons(hit)
    }

    function onUp() {
      selStart.current = null
      setSelBox(null)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  // ── Desktop right-click context menu ─────────────────────────
  function handleDesktopContextMenu(e) {
    // Only on bare desktop background
    if (e.target !== desktopRef.current && e.target !== e.currentTarget) return
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  // ── Icon arrangement helpers ──────────────────────────────────
  const CELL_W  = 114   // px per icon column
  const CELL_H  = 114   // px per icon row
  const GRID_X  = 16    // left margin
  const GRID_Y  = 16    // top margin

  function buildGrid(orderedIds) {
    const maxRows = Math.max(1, Math.floor((window.innerHeight - 28 - GRID_Y) / CELL_H))
    const positions = {}
    orderedIds.forEach((id, i) => {
      const col = Math.floor(i / maxRows)
      const row = i % maxRows
      positions[id] = { x: GRID_X + col * CELL_W, y: GRID_Y + row * CELL_H }
    })
    return positions
  }

  function handleContextAction(action) {
    const icons = getDesktopIcons(theme)

    if (action === 'arrange-name') {
      const sorted = [...icons].sort((a, b) => a.label.localeCompare(b.label))
      setIconPositions(prev => ({ ...prev, ...buildGrid(sorted.map(i => i.id)) }))
    }

    if (action === 'arrange-type') {
      const external = ['network', 'linkedin']
      const sorted = [...icons].sort((a, b) => {
        const aExt = external.includes(a.id) ? 1 : 0
        const bExt = external.includes(b.id) ? 1 : 0
        return aExt - bExt || a.label.localeCompare(b.label)
      })
      setIconPositions(prev => ({ ...prev, ...buildGrid(sorted.map(i => i.id)) }))
    }

    if (action === 'lineup') {
      // Snap each icon to nearest grid cell, preserving rough positions
      setIconPositions(prev => {
        const next = {}
        Object.entries(prev).forEach(([id, pos]) => {
          const col = Math.max(0, Math.round((pos.x - GRID_X) / CELL_W))
          const row = Math.max(0, Math.round((pos.y - GRID_Y) / CELL_H))
          next[id] = { x: GRID_X + col * CELL_W, y: GRID_Y + row * CELL_H }
        })
        return next
      })
    }

    if (action === 'auto-arrange') {
      const sorted = icons.map(i => i.id)
      setIconPositions(prev => ({ ...prev, ...buildGrid(sorted) }))
    }

    if (action === 'refresh') {
      // Visual-only: reset to original column layout
      setIconPositions({ ...INITIAL_ICON_POSITIONS })
    }
  }

  function startUpdate() {
    setUpdating(true)
  }

  function finishUpdate() {
    setUpdating(false)
    setTheme('win2000')
    setShowW2kWelcome(true)
    const ic = ICONS.win2000
    const iconMap = {
      about: ic.computer, projects: ic.documents,
      contact: ic.inbox,  resume: ic.briefcase,
      recycle: ic.recycle, linkedin: ic.linkedin,
      experience: ic.experience,
    }
    setWindows(prev => prev.map(w => ({ ...w, icon: iconMap[w.id] ?? w.icon })))
  }

  function openWindow(id) {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id)
      if (existing) {
        return prev.map(w =>
          w.id === id
            ? { ...w, isMinimized: false, isActive: true, zIndex: ++nextZ }
            : { ...w, isActive: false }
        )
      }
      const w = makeWindow(id, theme)
      if (!w) return prev
      return [...prev.map(p => ({ ...p, isActive: false })), w]
    })
  }

  function focusWindow(id) {
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, isActive: true, zIndex: ++nextZ }
          : { ...w, isActive: false }
      )
    )
  }

  function closeWindow(id)    { setWindows(prev => prev.filter(w => w.id !== id)) }
  function minimizeWindow(id) { setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true, isActive: false } : w)) }
  function maximizeWindow(id) { setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)) }

  function handleTaskbarClick(id) {
    setWindows(prev => {
      const w = prev.find(p => p.id === id)
      if (!w) return prev
      if (w.isMinimized) return prev.map(p => p.id === id ? { ...p, isMinimized: false, isActive: true, zIndex: ++nextZ } : { ...p, isActive: false })
      if (w.isActive)    return prev.map(p => p.id === id ? { ...p, isMinimized: true, isActive: false } : p)
      return prev.map(p => p.id === id ? { ...p, isActive: true, zIndex: ++nextZ } : { ...p, isActive: false })
    })
  }

  function handleStartAction(action) {
    const map = { 'open-about': 'about', 'open-projects': 'projects', 'open-contact': 'contact', 'open-resume': 'resume' }
    if (map[action]) openWindow(map[action])
    if (action === 'shutdown')        setShowWelcome(true)
    if (action === 'windows-update')  startUpdate()
  }

  // Mobile gets its own layout — no boot screen, no draggable windows
  if (isMobile) return <MobileLayout />

  return (
    <>
      {booting && <BootScreen onDone={() => { setBooting(false); setShowWelcome(true) }} />}
      {contextMenu && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onAction={handleContextAction}
        />
      )}

      <div
        className="desktop"
        ref={desktopRef}
        onMouseDown={handleDesktopMouseDown}
        onContextMenu={handleDesktopContextMenu}
      >
        {/* Rubber-band selection box */}
        {selBox && selBox.w > 2 && selBox.h > 2 && (
          <div
            className="selection-box"
            style={{ left: selBox.x, top: selBox.y, width: selBox.w, height: selBox.h }}
          />
        )}

        {/* Desktop icons — freely draggable */}
        <div className="desktop-icons-layer">
          {getDesktopIcons(theme).map(({ id, icon, label }) => (
            <DesktopIcon
              key={id}
              id={id}
              icon={icon}
              label={label}
              position={iconPositions[id] ?? INITIAL_ICON_POSITIONS[id] ?? { x: 16, y: 16 }}
              selected={selectedIcons.has(id)}
              onSelect={handleIconSelect}
              onOpen={() => {
                if (id === 'network')  window.open('https://github.com/Da0t', '_blank', 'noreferrer')
                else if (id === 'linkedin') window.open('https://www.linkedin.com/in/dat-nguyen-b1b554297/', '_blank', 'noreferrer')
                else openWindow(id)
              }}
              onDragStart={handleIconDragStart}
              onDrag={handleIconDrag}
              onDragStop={handleIconDragStop}
              playSound={getClickSound(theme)}
            />
          ))}
        </div>

        {/* Windows */}
        <div className="windows-layer">
          {windows.map(w => (
            <Window
              key={w.id}
              id={w.id}
              title={w.title}
              icon={w.icon}
              isActive={w.isActive}
              isMinimized={w.isMinimized}
              isMaximized={w.isMaximized}
              defaultPosition={w.defaultPosition}
              defaultSize={w.defaultSize}
              zIndex={w.zIndex}
              statusBar={w.statusBar}
              onFocus={() => focusWindow(w.id)}
              onClose={() => closeWindow(w.id)}
              onMinimize={() => minimizeWindow(w.id)}
              onMaximize={() => maximizeWindow(w.id)}
            >
              {w.content}
            </Window>
          ))}
        </div>

        {showWelcome && (
          <WelcomeDialog
            onClose={() => setShowWelcome(false)}
            onWhatsNew={() => { setShowWelcome(false); openWindow('about') }}
            onProjects={() => { setShowWelcome(false); openWindow('projects') }}
          />
        )}

        {updating && <WindowsUpdate onDone={finishUpdate} targetVersion="win2000" />}
        {showW2kWelcome && <Win2000Welcome onClose={() => setShowW2kWelcome(false)} />}

        <Taskbar
          windows={windows}
          onWindowClick={handleTaskbarClick}
          onStartAction={handleStartAction}
          theme={theme}
        />
      </div>
    </>
  )
}
