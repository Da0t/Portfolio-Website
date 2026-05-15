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

  // ── Full-Stack / Engineering ──────────────────────────────────
  {
    id: 4,
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
    id: 5,
    name: 'Create',
    type: 'folder',
    category: 'Open Source',
    date: '2026',
    desc: 'Open-source motion and 3D primitive library with an AI instruction layer. Lets coding assistants build polished web experiences by configuring reusable components rather than generating animations from scratch.',
    tech: ['TypeScript', 'Motion / 3D primitives', 'AI instruction layer'],
    github: 'https://github.com/Da0t/Create',
    live: null,
  },

  // ── Data Science / ML ─────────────────────────────────────────
  {
    id: 6,
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
    id: 7,
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
    id: 8,
    name: 'Friends Engagement Analysis',
    type: 'file',
    category: 'Data Science',
    date: '2024',
    desc: 'Statistical and Bayesian analysis of Friends episode data exploring how character dynamics and screen time drive viewership. Uses bootstrapping, hypothesis testing, and probabilistic modeling to uncover key drivers of audience engagement across all 10 seasons.',
    tech: ['Python', 'Jupyter Notebook', 'Bayesian modeling', 'Bootstrapping', 'Hypothesis testing'],
    github: 'https://github.com/Da0t/Friends-Data-Driven-Analysis-for-Enhanced-Engagement',
    live: null,
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
