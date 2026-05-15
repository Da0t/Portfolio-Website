import { useState, useEffect } from 'react'
import AboutWindow      from '../windows/AboutWindow'
import ProjectsWindow   from '../windows/ProjectsWindow'
import ContactWindow    from '../windows/ContactWindow'
import ResumeWindow     from '../windows/ResumeWindow'
import ExperienceWindow from '../windows/ExperienceWindow'
import RecycleBinWindow from '../windows/RecycleBinWindow'
import './MobileLayout.css'

function useTime() {
  const [t, setT] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// ── App icon definitions ─────────────────────────────────────
const APPS = [
  {
    id: 'about',
    label: 'About Me',
    bg: 'linear-gradient(145deg,#4FC3F7,#0288D1)',
    icon: <PersonIcon />,
    content: <AboutWindow />,
  },
  {
    id: 'experience',
    label: 'Experience',
    bg: 'linear-gradient(145deg,#CE93D8,#7B1FA2)',
    icon: <BriefcaseIcon />,
    content: <ExperienceWindow />,
  },
  {
    id: 'projects',
    label: 'Projects',
    bg: 'linear-gradient(145deg,#81C784,#2E7D32)',
    icon: <FolderIcon />,
    content: <ProjectsWindow />,
  },
  {
    id: 'resume',
    label: 'Resume',
    bg: 'linear-gradient(145deg,#FFD54F,#F57F17)',
    icon: <DocIcon />,
    content: <ResumeWindow />,
  },
  {
    id: 'contact',
    label: 'Contact',
    bg: 'linear-gradient(145deg,#69F0AE,#00695C)',
    icon: <MailIcon />,
    content: <ContactWindow />,
  },
  {
    id: 'recycle',
    label: 'Recycle Bin',
    bg: 'linear-gradient(145deg,#90A4AE,#37474F)',
    icon: <TrashIcon />,
    content: <RecycleBinWindow />,
  },
]

const DOCK = [
  {
    id: 'github',
    label: 'GitHub',
    bg: '#1B1F23',
    icon: <GithubIcon />,
    href: 'https://github.com/Da0t',
  },
  {
    id: 'about-dock',
    label: 'About Me',
    bg: 'linear-gradient(145deg,#4FC3F7,#0288D1)',
    icon: <PersonIcon />,
    appId: 'about',
  },
  {
    id: 'contact-dock',
    label: 'Contact',
    bg: 'linear-gradient(145deg,#69F0AE,#00695C)',
    icon: <MailIcon />,
    appId: 'contact',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    bg: '#0A66C2',
    icon: <LinkedInIcon />,
    href: 'https://www.linkedin.com/in/dat-nguyen-b1b554297/',
  },
]

export default function MobileLayout() {
  const time   = useTime()
  const [open, setOpen] = useState(null)

  const activeApp = APPS.find(a => a.id === open)

  function openApp(id) { setOpen(id) }
  function closeApp()  { setOpen(null) }

  return (
    <div className="ipod-root">
      {/* Dot wallpaper */}
      <div className="ipod-wallpaper" />

      {/* Status bar */}
      <div className="ipod-status">
        <span className="ipod-carrier">Dat.dev</span>
        <span className="ipod-time">{time}</span>
        <div className="ipod-status-right">
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>

      {/* App grid */}
      <div className="ipod-grid">
        {APPS.map(app => (
          <AppIcon
            key={app.id}
            label={app.label}
            bg={app.bg}
            icon={app.icon}
            onTap={() => openApp(app.id)}
          />
        ))}
      </div>

      {/* Page dots */}
      <div className="ipod-dots">
        <div className="ipod-dot active" />
        <div className="ipod-dot" />
      </div>

      {/* Dock */}
      <div className="ipod-dock-wrap">
        <div className="ipod-dock">
          {DOCK.map(d => (
            d.href
              ? <a key={d.id} href={d.href} target="_blank" rel="noreferrer" className="ipod-dock-item">
                  <div className="ipod-dock-icon squircle" style={{ background: d.bg }}>
                    {d.icon}
                  </div>
                  <span className="ipod-dock-label">{d.label}</span>
                </a>
              : <button key={d.id} className="ipod-dock-item" onClick={() => openApp(d.appId)}>
                  <div className="ipod-dock-icon squircle" style={{ background: d.bg }}>
                    {d.icon}
                  </div>
                  <span className="ipod-dock-label">{d.label}</span>
                </button>
          ))}
        </div>
      </div>

      {/* App full-screen overlay */}
      {open && activeApp && (
        <div className="ipod-app-screen">
          {/* App nav bar */}
          <div className="ipod-app-navbar" style={{ background: activeApp.bg }}>
            <button className="ipod-back-btn" onClick={closeApp}>‹ Home</button>
            <span className="ipod-app-title">{activeApp.label}</span>
            <div style={{ width: 60 }} />
          </div>
          {/* Content */}
          <div className="ipod-app-content">
            {activeApp.content}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Reusable app icon ────────────────────────────────────────
function AppIcon({ label, bg, icon, onTap }) {
  return (
    <button className="ipod-app-item" onClick={onTap}>
      <div className="squircle ipod-app-icon" style={{ background: bg }}>
        {icon}
        <div className="squircle-gloss" />
      </div>
      <span className="ipod-app-label">{label}</span>
    </button>
  )
}

// ── SVG icons ────────────────────────────────────────────────
function PersonIcon() {
  return <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
}
function BriefcaseIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="30" height="30">
    <rect x="2" y="9" width="20" height="13" rx="2"/>
    <path d="M16 9V7a4 4 0 0 0-8 0v2"/>
    <line x1="12" y1="13" x2="12" y2="17"/>
    <line x1="2" y1="14" x2="22" y2="14"/>
  </svg>
}
function FolderIcon() {
  return <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  </svg>
}
function DocIcon() {
  return <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none"/>
    <line x1="8" y1="13" x2="16" y2="13" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5"/>
    <line x1="8" y1="17" x2="13" y2="17" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5"/>
  </svg>
}
function MailIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="30" height="30">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
}
function TrashIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="28" height="28">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
}
function GithubIcon() {
  return <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
}
function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
}
function WifiIcon() {
  return <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
    <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>
  </svg>
}
function BatteryIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="22" height="14">
    <rect x="1" y="5" width="18" height="14" rx="2"/>
    <rect x="3" y="7" width="12" height="10" fill="white" stroke="none" rx="1"/>
    <line x1="23" y1="10" x2="23" y2="14" strokeWidth="3" strokeLinecap="round"/>
  </svg>
}
