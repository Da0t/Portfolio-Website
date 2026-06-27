import { useState, useEffect } from 'react'
import {
  AboutContent,
  ExperienceContent,
  ProjectsContent,
  ContactContent,
  ResumeContent,
} from './MobileContent'
import TetrisContent from './TetrisContent'
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
    content: <AboutContent />,
  },
  {
    id: 'experience',
    label: 'Experience',
    bg: 'linear-gradient(145deg,#CE93D8,#7B1FA2)',
    icon: <BriefcaseIcon />,
    content: <ExperienceContent />,
  },
  {
    id: 'projects',
    label: 'Projects',
    bg: 'linear-gradient(145deg,#81C784,#2E7D32)',
    icon: <FolderIcon />,
    content: <ProjectsContent />,
  },
  {
    id: 'resume',
    label: 'Resume',
    bg: 'linear-gradient(145deg,#FFD54F,#F57F17)',
    icon: <DocIcon />,
    content: <ResumeContent />,
  },
  {
    id: 'contact',
    label: 'Contact',
    bg: 'linear-gradient(145deg,#69F0AE,#00695C)',
    icon: <MailIcon />,
    content: <ContactContent />,
  },
  {
    id: 'tetris',
    label: 'Tetris',
    bg: 'linear-gradient(145deg,#B39DDB,#5856D6)',
    icon: <TetrisIcon />,
    content: <TetrisContent />,
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
    href: 'https://www.linkedin.com/in/datnguy3n/',
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
      {/* Wallpaper */}
      <div className="ipod-wallpaper">
        <img
          src="/ios-wallpaper.jpg"
          alt=""
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
      </div>

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
                    <div className="squircle-gloss" />
                  </div>
                  <span className="ipod-dock-label">{d.label}</span>
                </a>
              : <button key={d.id} className="ipod-dock-item" onClick={() => openApp(d.appId)}>
                  <div className="ipod-dock-icon squircle" style={{ background: d.bg }}>
                    {d.icon}
                    <div className="squircle-gloss" />
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
          <div className="ipod-app-navbar">
            <button className="ipod-back-btn" onClick={closeApp}>‹ Home</button>
            <span className="ipod-app-title">{activeApp.label}</span>
            <div style={{ width: 64 }} />
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
  return <svg viewBox="0 0 24 24" fill="#fff" width="30" height="30">
    <circle cx="12" cy="8" r="4.3"/>
    <path d="M12 13.4c-4.4 0-7.4 2.5-7.4 5.4 0 .66.45 1.2 1.1 1.2h12.6c.67 0 1.1-.54 1.1-1.2 0-2.9-3-5.4-7.4-5.4z"/>
  </svg>
}
function BriefcaseIcon() {
  return <svg viewBox="0 0 24 24" fill="#fff" width="30" height="30">
    <path d="M9.2 3.6h5.6a2.1 2.1 0 0 1 2.1 2.1v1.7h-2V5.9a.4.4 0 0 0-.4-.4H9.5a.4.4 0 0 0-.4.4v1.5h-2V5.7a2.1 2.1 0 0 1 2.1-2.1z"/>
    <rect x="2.6" y="7.4" width="18.8" height="12.6" rx="2.3"/>
    <rect x="10.3" y="11.8" width="3.4" height="3.1" rx="0.7" fill="rgba(0,0,0,0.28)"/>
  </svg>
}
function FolderIcon() {
  return <svg viewBox="0 0 24 24" fill="#fff" width="31" height="31">
    <path d="M3 7.1A1.7 1.7 0 0 1 4.7 5.4h4.1l2.1 2.1h6.4A1.7 1.7 0 0 1 19 9.2v.6H3z" fill="rgba(255,255,255,0.82)"/>
    <path d="M2.6 9.6h18.8a1 1 0 0 1 .98 1.2l-1.45 6.9A1.6 1.6 0 0 1 19.36 19H4.3A1.6 1.6 0 0 1 2.6 17.4z"/>
  </svg>
}
function DocIcon() {
  return <svg viewBox="0 0 24 24" fill="#fff" width="29" height="29">
    <path d="M6.4 3h6.3L18 8.3V19a2 2 0 0 1-2 2H6.4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
    <path d="M12.6 3.2v3.9a1 1 0 0 0 1 1h3.7z" fill="rgba(0,0,0,0.20)"/>
    <rect x="7.4" y="11.6" width="8.8" height="1.5" rx="0.75" fill="rgba(0,0,0,0.24)"/>
    <rect x="7.4" y="14.4" width="8.8" height="1.5" rx="0.75" fill="rgba(0,0,0,0.24)"/>
    <rect x="7.4" y="17.2" width="5.6" height="1.5" rx="0.75" fill="rgba(0,0,0,0.24)"/>
  </svg>
}
function MailIcon() {
  return <svg viewBox="0 0 24 24" fill="#fff" width="31" height="31">
    <rect x="2.6" y="5.6" width="18.8" height="12.8" rx="2.6"/>
    <path d="M3.8 7.8l8.2 5.9 8.2-5.9" fill="none" stroke="rgba(0,0,0,0.30)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
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
  return <svg viewBox="0 0 24 24" fill="#fff" width="29" height="29">
    <rect x="3" y="8.8" width="3.5" height="11.2" rx="0.4"/>
    <circle cx="4.75" cy="4.8" r="2.15"/>
    <path d="M9 8.8h3.35v1.55h.05a3.7 3.7 0 0 1 3.3-1.78c3.05 0 4.3 1.95 4.3 4.85V20h-3.5v-5.35c0-1.32-.46-2.27-1.78-2.27-1.06 0-1.6.7-1.85 1.4-.1.25-.12.6-.12.95V20H9z"/>
  </svg>
}
function TetrisIcon() {
  return <svg viewBox="0 0 24 24" width="30" height="30">
    <rect x="3.6" y="4.4" width="5.5" height="5.5" rx="1.1" fill="#4FC3F7"/>
    <rect x="9.4" y="4.4" width="5.5" height="5.5" rx="1.1" fill="#FFD54F"/>
    <rect x="9.4" y="10.2" width="5.5" height="5.5" rx="1.1" fill="#E57373"/>
    <rect x="15.2" y="10.2" width="5.5" height="5.5" rx="1.1" fill="#81C784"/>
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
