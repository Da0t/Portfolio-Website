import { useState } from 'react'
import './ProjectsWindow.css'

const projects = [
  // ── Hackathon / Featured ──────────────────────────────────────
  {
    id: 1,
    name: 'Rewind.',
    type: 'folder',
    category: 'Hackathon',
    date: '2026',
    desc: '1st place SDx Hackathon. Fork pipeline that paginates full message history, truncates at the user\'s chosen point, remaps schemas for Omnara\'s import endpoint, and launches a fresh agent. Includes a typed Omnara API client for 6 endpoints with regex-based decision detection.',
    tech: ['Python', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Omnara API'],
    github: 'https://github.com/Da0t',
    live: null,
  },
  {
    id: 2,
    name: 'Atlas.',
    type: 'folder',
    category: 'Hackathon',
    date: '2026',
    desc: 'Multimodal RAG pipeline using TwelveLabs and Claude Sonnet 4.6, retrieving timestamped clips across visual, audio, and transcript modalities. Post-filters ~90% cross-video noise. Study suite with auto-generated notes, Quizlet flashcards, and PDF practice problems.',
    tech: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Python', 'SQLite', 'TwelveLabs API', 'Claude API'],
    github: 'https://github.com/Da0t',
    live: null,
  },
  {
    id: 3,
    name: 'SpectraStruct',
    type: 'folder',
    category: 'Hackathon',
    date: '2026',
    desc: 'DiamondHacks project. Molecular identification system that analyzes spectroscopic data (NMR, MS, IR) to predict chemical structures. Returns top-10 candidate molecules with 3D conformers. Demo mode includes 20 precomputed molecules (caffeine, aspirin, dopamine).',
    tech: ['Next.js', 'Tailwind CSS', 'FastAPI', 'Python', 'RDKit', 'SELFIES', 'MIST (MIT)'],
    github: 'https://github.com/Da0t/SpectraStruct',
    live: null,
  },
  {
    id: 4,
    name: 'whatyoudoin',
    type: 'folder',
    category: 'Hackathon',
    date: '2026',
    desc: 'A voice-driven command-line debugging assistant: you ask "what\'s wrong?" out loud, it transcribes the question with Deepgram, sends it plus all your project source files to Claude, and Claude names the broken file and suggests a fix. Diagnoses are stored in a local SQLite database so a separate `fix` command can apply the change (backing up the original as .bak) or run a script, capture the crash traceback, and auto-fix it.',
    tech: ['Python', 'Anthropic Claude API', 'Deepgram', 'SQLite', 'sounddevice', 'httpx'],
    github: 'https://github.com/Da0t/whatyadoin-',
    live: null,
  },
  {
    id: 5,
    name: 'Aside — The Narrator',
    type: 'folder',
    category: 'Hackathon',
    date: '2026',
    desc: 'A wearable AI narrator that watches a room through a chest-mounted Raspberry Pi camera and narrates what\'s happening in a swappable personality — hype man, goth mommy, or epic-quest narrator. A Python backend sends frames to Claude Haiku 4.5 vision, runs Deepgram STT/TTS, holds personality and memory state in Redis, and streams text and audio over WebSocket to a React Native app that ducks music under the narration.',
    tech: ['TypeScript', 'React Native', 'Python', 'C++', 'Claude Haiku 4.5', 'Deepgram', 'Redis', 'QNX', 'WebSockets'],
    github: 'https://github.com/Da0t/AsideAI',
    live: 'https://aside-website.vercel.app/',
  },

  // ── Open Source ───────────────────────────────────────────────
  {
    id: 6,
    name: 'dazineui',
    type: 'folder',
    category: 'Open Source',
    date: '2026',
    desc: 'An npm-published React + Three.js library of six animated motion primitives (FlowGradient, SpotlightGradient, MeshGradient, NoiseGradient, AuroraGradient, WaveGrid) built on react-three-fiber with custom GLSL shaders. Its twist is an AI-integration layer: a postinstall script drops a Cursor/Claude rules file into the host project so coding assistants automatically learn the primitives, prompt routing, and anti-patterns.',
    tech: ['TypeScript', 'React', 'Three.js', 'react-three-fiber', '@react-three/drei', 'GLSL', 'tsup', 'npm'],
    github: 'https://github.com/Da0t/dazineui',
    live: null,
  },

  // ── Full-Stack / Engineering ──────────────────────────────────
  {
    id: 7,
    name: 'Weather-Adaptive IoT Energy Monitor',
    type: 'folder',
    category: 'Engineering',
    date: '2025',
    desc: 'Real-time energy monitoring system combining ESP32 embedded sensors with cloud analytics. Tracks fan operation across modes, contextualizes usage against live weather via Open-Meteo API, and estimates cost savings across multiple electricity markets. Multi-device simulation supports 1–10 units.',
    tech: ['ESP32 / C++', 'Supabase', 'Streamlit', 'Python', 'Open-Meteo API', 'Plotly', 'Vercel'],
    github: 'https://github.com/Da0t/Weather-Adaptive-IoT-Energy-Monitor',
    live: 'https://weather-adaptive-io-t-energy-monito.vercel.app',
  },
  {
    id: 8,
    name: 'Lattice',
    type: 'folder',
    category: 'Engineering',
    date: '2026',
    desc: 'A counter-UAV mesh system pairing a live simulation dashboard with real RF hardware code. The Next.js + deck.gl/Mapbox "Pylon" dashboard deploys a self-healing ring of autonomous relays that discover neighbors by proximity, route threat data through a BFS-pathfound mesh, intercept hostile drones, and reroute when a relay is destroyed. A Python service backs it with an RTL-SDR/ADALM-Pluto detector that learns the ambient RF spectrum to flag novel emitters, plus a gossip-based peer-to-peer relay mesh.',
    tech: ['Next.js 14', 'React 18', 'TypeScript', 'deck.gl 9', 'Mapbox GL', 'Python', 'RTL-SDR', 'scikit-learn'],
    github: 'https://github.com/Da0t/Lattice',
    live: null,
  },
  {
    id: 9,
    name: 'Windows 95 Desktop Portfolio',
    type: 'folder',
    category: 'Engineering',
    date: '2026',
    desc: 'This very site — a personal portfolio built as an interactive Windows 95 / Windows 2000 desktop emulator: draggable, resizable windows with 3D chrome, a Win95-to-Win2000 "Windows Update" upgrade flow, rubber-band icon selection, a right-click context menu, and a playable Minesweeper easter egg. On mobile it swaps to a native iOS home screen with a frosted-glass dock and a touch-controlled Tetris game.',
    tech: ['React 18', 'Vite', 'JavaScript', 'react-draggable', 'Vanilla CSS', 'Vercel'],
    github: 'https://github.com/Da0t/Portfolio-Website',
    live: 'https://dats-portfolio.vercel.app',
  },

  // ── Data Science / ML ─────────────────────────────────────────
  {
    id: 10,
    name: 'SJ Housing Analysis',
    type: 'file',
    category: 'Data Science',
    date: '2025',
    desc: 'Analysis of long-term housing affordability in the San Jose MSA. Constructs price-to-income and rent burden ratios across ~130 monthly observations. Employs time-series regression with chronological train/test splits to forecast whether housing costs have outpaced income growth.',
    tech: ['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'Seaborn', 'Jupyter', 'Zillow / Census data'],
    github: 'https://github.com/Da0t/SJ-housing-analysis',
    live: null,
  },
  {
    id: 11,
    name: 'TSwift Song Recommender',
    type: 'file',
    category: 'Data Science',
    date: '2024',
    desc: 'Data-driven recommender system analyzing Taylor Swift\'s full discography. Combines TF-IDF vectorization on lyrics with audio feature processing (tempo, valence, energy) for personalized song suggestions. Includes EDA visualizations and trend insights across all albums.',
    tech: ['Python', 'Jupyter Notebook', 'TF-IDF', 'Scikit-Learn', 'Spotify audio features'],
    github: 'https://github.com/Da0t/TSwift-Song-Recommender',
    live: null,
  },
  {
    id: 12,
    name: 'Friends Engagement Analysis',
    type: 'file',
    category: 'Data Science',
    date: '2024',
    desc: 'Statistical and Bayesian analysis of Friends episode data exploring how character dynamics and screen time drive viewership. Uses bootstrapping, hypothesis testing, and probabilistic modeling to uncover key drivers of audience engagement across all 10 seasons.',
    tech: ['Python', 'Jupyter Notebook', 'Bayesian modeling', 'Bootstrapping', 'Hypothesis testing'],
    github: 'https://github.com/Da0t/Friends-Data-Driven-Analysis-for-Enhanced-Engagement',
    live: null,
  },
  {
    id: 13,
    name: 'Mila Expense Dashboard',
    type: 'folder',
    category: 'Data Science',
    date: '2026',
    desc: 'A real-time expense-tracking dashboard for a boutique retail store that pulls live receipt data from Supabase via postgres_changes subscriptions. It surfaces spending patterns through KPI cards and eight visualizations — a Sankey money-flow chart, area/bar/radar/donut charts, and tables for top transactions and breakdowns by month, day of week, and payment method.',
    tech: ['React 19', 'Vite', 'Supabase', 'Recharts', 'Nivo', 'JavaScript'],
    github: 'https://github.com/Da0t/Dashboard-Supabase-and-Shenanigans',
    live: null,
  },
  {
    id: 14,
    name: 'First Baron Win Predictor',
    type: 'file',
    category: 'Data Science',
    date: '2026',
    desc: 'A DSC 80 (UCSD) final-project report investigating whether teams that secure the first Baron Nashor win at higher rates in competitive League of Legends, using the 2022 Oracle\'s Elixir dataset (~21k cleaned team-level rows). Covers data cleaning, EDA, NMAR missingness testing, permutation/hypothesis tests, and a 15-minute-state win classifier (logistic-regression baseline to a GridSearchCV-tuned random forest at ~74% accuracy), plus a fairness comparison across the LCK and LCS leagues.',
    tech: ['Python', 'scikit-learn', 'pandas', 'Plotly', 'Jekyll', 'HTML/SCSS'],
    github: 'https://github.com/Da0t/dsc80-project-website',
    live: 'https://da0t.github.io/dsc80-project-website/',
  },
]

const CATEGORIES = ['All', 'Hackathon', 'Open Source', 'Engineering', 'Data Science']
const CATEGORY_COLORS = {
  Hackathon:      '#000080',
  'Open Source':  '#006060',
  Engineering:    '#005A00',
  'Data Science': '#7A3000',
}

export default function ProjectsWindow() {
  const [selected, setSelected]       = useState(null)
  const [activeCategory, setCategory] = useState('All')

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory)
  const project  = projects.find(p => p.id === selected)

  return (
    <div className="projects-window">
      {/* Category filter toolbar */}
      <div className="projects-toolbar raised">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`btn95 cat-btn ${activeCategory === cat ? 'pressed' : ''}`}
            onClick={() => { setCategory(cat); setSelected(null) }}
          >
            {cat}
          </button>
        ))}
        <div className="toolbar-sep" />
        <span className="toolbar-label">{filtered.length} project(s)</span>
      </div>

      <div className="projects-body">
        {/* File list */}
        <div className="projects-filelist sunken">
          <div className="filelist-header">
            <span className="col-icon" />
            <span className="col-name">Name</span>
            <span className="col-cat">Category</span>
            <span className="col-date">Year</span>
          </div>

          {filtered.map(p => (
            <div
              key={p.id}
              className={`filelist-row ${selected === p.id ? 'selected' : ''}`}
              onClick={() => setSelected(p.id)}
              onDoubleClick={() => window.open(p.github, '_blank', 'noreferrer')}
            >
              <img
                src={p.type === 'folder' ? '/icons/folder.svg' : '/icons/file.svg'}
                alt=""
                className="file-icon"
              />
              <span className="col-name">{p.name}</span>
              <span
                className="col-cat"
                style={{ color: CATEGORY_COLORS[p.category] ?? 'inherit' }}
              >
                {p.category}
              </span>
              <span className="col-date">{p.date}</span>
            </div>
          ))}
        </div>

        {/* Detail pane */}
        {selected && project && (
          <div className="projects-detail">
            <div className="detail-icon-row">
              <img
                src={project.type === 'folder' ? '/icons/folder.svg' : '/icons/file.svg'}
                alt=""
                className="detail-icon"
              />
              <strong>{project.name}</strong>
            </div>

            <div
              className="detail-badge"
              style={{ background: CATEGORY_COLORS[project.category] ?? '#000080' }}
            >
              {project.category}
            </div>

            <div className="about-divider" style={{ margin: '6px 0' }} />

            <p className="detail-desc">{project.desc}</p>

            <div className="detail-tech">
              {project.tech.map(t => (
                <span key={t} className="skill-chip raised">{t}</span>
              ))}
            </div>

            <div className="detail-actions">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn95 default-btn"
              >
                GitHub →
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn95"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
