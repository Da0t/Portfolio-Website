import './MobileContent.css'

/* ── SVG icons (no emojis) ──────────────────────────────────── */
function IcGrad() {
  return <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <path d="M10 3L2 7l8 4 8-4-8-4z" fill="#007AFF"/>
    <path d="M2 7v5c0 2.2 3.6 4 8 4s8-1.8 8-4V7" stroke="#007AFF" strokeWidth="1.5" fill="none"/>
    <line x1="18" y1="7" x2="18" y2="13" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
}
function IcPin() {
  return <svg viewBox="0 0 20 20" fill="#FF3B30" width="18" height="18">
    <path d="M10 2a5.5 5.5 0 0 0-5.5 5.5c0 4 5.5 10.5 5.5 10.5s5.5-6.5 5.5-10.5A5.5 5.5 0 0 0 10 2z"/>
    <circle cx="10" cy="7.5" r="2" fill="white"/>
  </svg>
}
function IcCal() {
  return <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <rect x="2" y="4" width="16" height="14" rx="3" fill="#FF9500"/>
    <rect x="2" y="4" width="16" height="5" rx="0" fill="#FF9500"/>
    <rect x="2" y="4" width="16" height="5" rx="3" fill="#FF9500"/>
    <path d="M6 3v3M14 3v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <text x="10" y="15" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">28</text>
  </svg>
}
function IcMail() {
  return <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <rect x="2" y="5" width="16" height="11" rx="2" fill="#007AFF"/>
    <path d="M2 7l8 5 8-5" stroke="white" strokeWidth="1.5" fill="none"/>
  </svg>
}
function IcGithub() {
  return <svg viewBox="0 0 20 20" fill="#1B1F23" width="18" height="18">
    <path d="M10 2C5.58 2 2 5.58 2 10c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.88-1.17-.88-1.17-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.22 1.86.87 2.31.66.07-.52.28-.87.5-1.07-1.77-.2-3.63-.89-3.63-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 10 6.84c.68 0 1.36.09 2 .26 1.52-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.46.55.38A8 8 0 0 0 18 10c0-4.42-3.58-8-8-8z"/>
  </svg>
}
function IcLinkedin() {
  return <svg viewBox="0 0 20 20" fill="#0A66C2" width="18" height="18">
    <rect x="2" y="2" width="16" height="16" rx="3" fill="#0A66C2"/>
    <path d="M5.5 8.5v6M5.5 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 8.5v6M9 11a2.5 2.5 0 0 1 5 0v3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
}
function IcDoc() {
  return <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <path d="M5 2h7l4 4v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" fill="#FF6B6B"/>
    <path d="M12 2v4h4" fill="#FF9E9E"/>
    <line x1="6" y1="10" x2="14" y2="10" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="6" y1="13" x2="11" y2="13" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
}
function IcStar() {
  return <svg viewBox="0 0 20 20" fill="#FFD600" width="18" height="18">
    <path d="M10 2l2.09 4.26 4.71.68-3.4 3.32.8 4.69L10 12.77l-4.2 2.18.8-4.69L3.2 6.94l4.71-.68L10 2z"/>
  </svg>
}
function IcBriefcase() {
  return <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <rect x="2" y="7" width="16" height="10" rx="2" fill="#5856D6"/>
    <path d="M13 7V6a3 3 0 0 0-6 0v1" stroke="#5856D6" strokeWidth="1.5"/>
    <line x1="2" y1="12" x2="18" y2="12" stroke="white" strokeWidth="1" opacity=".4"/>
  </svg>
}
function IcRocket() {
  return <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <path d="M10 2c0 0 4 2 4 8l-4 6-4-6c0-6 4-8 4-8z" fill="#FF9500"/>
    <circle cx="10" cy="10" r="2" fill="white"/>
    <path d="M6 14l-2 4M14 14l2 4" stroke="#FF9500" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
}
function IcChart() {
  return <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <rect x="3" y="12" width="3" height="5" rx="1" fill="#34C759"/>
    <rect x="8" y="8" width="3" height="9" rx="1" fill="#34C759"/>
    <rect x="13" y="5" width="3" height="12" rx="1" fill="#34C759"/>
    <line x1="2" y1="18" x2="18" y2="18" stroke="#34C759" strokeWidth="1.2"/>
  </svg>
}
function IcMicro() {
  return <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <rect x="7" y="2" width="6" height="10" rx="3" fill="#FF2D55"/>
    <path d="M4 10a6 6 0 0 0 12 0" stroke="#FF2D55" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <line x1="10" y1="16" x2="10" y2="19" stroke="#FF2D55" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
}
function IcCode() {
  return <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <polyline points="6,6 2,10 6,14" stroke="#007AFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="14,6 18,10 14,14" stroke="#007AFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="4" x2="8" y2="16" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
}
function IcData() {
  return <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <ellipse cx="10" cy="5" rx="7" ry="2.5" fill="#AF52DE"/>
    <path d="M3 5v5c0 1.38 3.13 2.5 7 2.5S17 11.38 17 10V5" stroke="#AF52DE" strokeWidth="1.2" fill="none"/>
    <path d="M3 10v5c0 1.38 3.13 2.5 7 2.5S17 16.38 17 15v-5" stroke="#AF52DE" strokeWidth="1.2" fill="none"/>
  </svg>
}
function IcTrash() {
  return <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
    <polyline points="3,5 5,5 17,5" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="#8E8E93" strokeWidth="1.5"/>
    <path d="M6 5l.75 12h6.5L14 5" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="10" y1="9" x2="10" y2="14" stroke="#8E8E93" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="8" y1="9" x2="8.3" y2="14" stroke="#8E8E93" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="12" y1="9" x2="11.7" y2="14" stroke="#8E8E93" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
}

/* ── Shared iOS primitives ──────────────────────────────────── */
function Section({ label, children }) {
  return (
    <div className="ios-section">
      {label && <div className="ios-section-label">{label}</div>}
      <div className="ios-card">{children}</div>
    </div>
  )
}

function Row({ icon, label, value, last, href, chevron }) {
  const inner = (
    <div className={`ios-row ${last ? 'ios-row-last' : ''}`}>
      {icon && <div className="ios-row-icon">{icon}</div>}
      <div className="ios-row-body">
        <span className="ios-row-label">{label}</span>
        {value && <span className="ios-row-value">{value}</span>}
      </div>
      {(href || chevron) && <span className="ios-chevron">›</span>}
    </div>
  )
  return href
    ? <a href={href} target="_blank" rel="noreferrer" className="ios-row-link">{inner}</a>
    : inner
}

function Tag({ children, color = '#007AFF' }) {
  return (
    <span className="ios-tag" style={{ background: color + '18', color }}>
      {children}
    </span>
  )
}

function Divider() { return <div className="ios-divider" /> }

/* ── About Me ──────────────────────────────────────────────── */
export function AboutContent() {
  return (
    <div className="ios-screen">
      <div className="ios-profile-hero">
        <img
          src="/photo.jpg"
          alt="Dat Nguyen"
          className="ios-avatar"
          onError={e => { e.currentTarget.src = 'https://avatars.githubusercontent.com/u/179423998?v=4' }}
        />
        <h1 className="ios-profile-name">Dat Nguyen</h1>
        <p className="ios-profile-sub">Data Science + Economics · UCSD</p>
        <p className="ios-profile-sub2">1st Place, Berkeley AI Hackathon · Co-Founder @ Aria AI</p>
        <div className="ios-social-row">
          <a href="https://github.com/Da0t" target="_blank" rel="noreferrer" className="ios-social-btn">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/datnguy3n/" target="_blank" rel="noreferrer" className="ios-social-btn ios-social-btn-blue">
            LinkedIn
          </a>
        </div>
      </div>

      <Section label="Bio">
        <div className="ios-bio-text">
          I build things end-to-end — consumer AI wearables, full-stack web apps,
          and ML classifiers on satellite imagery. I care about writing code that actually
          ships and systems that hold up under real conditions. Currently co-founding
          Aria AI and building full-stack systems at Netra and SEO USA.
        </div>
      </Section>

      <Section label="Details">
        <Row icon={<IcGrad />} label="University" value="UC San Diego" />
        <Divider />
        <Row icon={<IcPin />} label="Location" value="La Jolla, CA" />
        <Divider />
        <Row icon={<IcCal />} label="Graduation" value="June 2028" />
        <Divider />
        <Row icon={<IcMail />} label="Email" value="datq.nguyen06@gmail.com" last />
      </Section>

      <Section label="Skills">
        <div className="ios-tags-wrap" style={{ padding: '12px 16px' }}>
          {['Python','TypeScript','React','Next.js','FastAPI','SQL','PyTorch',
            'Scikit-Learn','Pandas','Supabase','PostgreSQL','Docker','AWS','QGIS','Tailwind CSS','Git'].map(s => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Section>

      <Section label="Contact">
        <Row icon={<IcGithub />} label="GitHub" value="Da0t" href="https://github.com/Da0t" chevron last />
      </Section>
    </div>
  )
}

/* ── Experience ─────────────────────────────────────────────── */
const jobs = [
  {
    role: 'Co-Founder & Founding SWE',
    org: 'Aria AI',
    period: 'Jun 2026 – Present',
    type: 'work',
    color: '#FF2D55',
    Icon: IcRocket,
    bullets: [
      'Co-founded a consumer wearable AI startup — 25,000+ launch views in 24h',
      'Selected into Deepgram\'s startup program with 1,000+ sponsored API credits',
      'Token-driven Tailwind design system, sub-140 KB first load + GitHub Actions CI',
    ],
  },
  {
    role: 'Founding Software Engineer',
    org: 'Netra',
    period: 'May 2026 – Present',
    type: 'work',
    color: '#007AFF',
    Icon: IcBriefcase,
    bullets: [
      'Deployed the site for a $100k-funded startup via Nginx, Cloudflare, GitHub Actions',
      'Designed the company visual identity — logo, site, investor pitch decks',
    ],
  },
  {
    role: 'Full-Stack Developer Intern',
    org: 'SEO USA',
    period: 'May 2026 – Present',
    type: 'work',
    color: '#5856D6',
    Icon: IcCode,
    bullets: [
      'Containerized FastAPI + Docker REST API with Supabase/Firebase auth',
      'Improved PostgreSQL query performance 15% via execution plans + indexing',
      'Full-stack React + Python features in agile sprints with CI/CD',
    ],
  },
  {
    role: 'Software Engineer Lead',
    org: 'AISC @ UC San Diego',
    period: 'Apr – Jul 2026',
    type: 'work',
    color: '#34C759',
    Icon: IcChart,
    bullets: [
      'Production platform for 350+ members (Next.js/React/Tailwind), 20% faster via ISR',
      'Improved data retrieval 60% migrating JSON → Supabase PostgreSQL with RLS',
    ],
  },
  {
    role: 'Undergraduate Researcher, ML/AI',
    org: 'Economics Research Lab @ UCSD',
    period: 'Mar – Jun 2026',
    type: 'research',
    color: '#FF9500',
    Icon: IcData,
    bullets: [
      'Random Forest: 0.982 ROC-AUC · 0.92 F1 on informal settlement detection',
      'Preprocessed 2,000+ satellite images using QGIS, Python, GeoPandas',
    ],
  },
  {
    role: 'VP Project Operations',
    org: 'DataWorks @ UC San Diego',
    period: 'Mar 2026 – Present',
    type: 'leadership',
    color: '#FF2D55',
    Icon: IcMicro,
    bullets: [
      'Lead 10-person team building LLM-powered receipt scanning app',
      'Architecting camera → Supabase → Next.js dashboard pipeline',
    ],
  },
  {
    role: 'Campaign Lead',
    org: 'CALPIRG Students – UCSD',
    period: 'Dec 2024 – Jan 2026',
    type: 'leadership',
    color: '#FF9500',
    Icon: IcStar,
    bullets: [
      '200+ volunteer hours, trained 6 volunteers',
      'Built Excel dashboards and pivot tables for campaign metrics',
    ],
  },
]

export function ExperienceContent() {
  return (
    <div className="ios-screen">
      {jobs.map((j, i) => (
        <div key={i} className="ios-exp-card">
          <div className="ios-exp-header">
            <div className="ios-exp-icon-wrap" style={{ background: j.color + '20' }}>
              <j.Icon />
            </div>
            <div className="ios-exp-meta">
              <div className="ios-exp-role">{j.role}</div>
              <div className="ios-exp-org">{j.org}</div>
              <div className="ios-exp-period">{j.period}</div>
            </div>
          </div>
          {j.bullets.length > 0 && (
            <ul className="ios-exp-bullets">
              {j.bullets.map((b, k) => (
                <li key={k}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Projects ────────────────────────────────────────────────── */
const projects = [
  { name:'Rewind.', cat:'Hackathon', color:'#007AFF',
    desc:'1st place SDx Hackathon. AI fork-and-resume pipeline with a typed Omnara API client for 6 endpoints.',
    tech:['Python','Next.js','TypeScript','Omnara API'], link:'https://github.com/Da0t',
    CatIcon: IcStar },
  { name:'Atlas.', cat:'Hackathon', color:'#5856D6',
    desc:'Multimodal RAG pipeline (TwelveLabs + Claude Sonnet 4.6). Filters ~90% cross-video noise. Study suite with notes, flashcards, PDF problems.',
    tech:['Next.js','FastAPI','SQLite','TwelveLabs','Claude API'], link:'https://github.com/Da0t',
    CatIcon: IcStar },
  { name:'SpectraStruct', cat:'Hackathon', color:'#34C759',
    desc:'DiamondHacks — molecular ID from NMR/MS/IR spectra. Top-10 candidates with 3D conformers.',
    tech:['FastAPI','RDKit','Next.js','MIST (MIT)'], link:'https://github.com/Da0t/SpectraStruct',
    CatIcon: IcStar },
  { name:'whatyoudoin', cat:'Hackathon', color:'#FF9500',
    desc:'Voice-driven CLI: ask what\'s wrong with your code out loud, then Deepgram + Claude find the broken file and apply the fix.',
    tech:['Python','Claude API','Deepgram','SQLite'], link:'https://github.com/Da0t/whatyadoin-',
    CatIcon: IcStar },
  { name:'Aside — The Narrator', cat:'Hackathon', color:'#FF2D55',
    desc:'1st place (Deepgram Track), Berkeley AI Hackathon. A wearable that watches a room and narrates your life out loud in a personality you can swap on the fly.',
    tech:['React Native','Python','Claude','Deepgram'], link:'https://github.com/Da0t/AsideAI',
    live:'https://aside-website.vercel.app/',
    CatIcon: IcStar },
  { name:'dazineui', cat:'Open Source', color:'#5856D6',
    desc:'npm-published React/Three.js library of six motion primitives that auto-teaches AI coding tools how to use it via injected Cursor/Claude rules.',
    tech:['TypeScript','Three.js','react-three-fiber','GLSL'], link:'https://github.com/Da0t/dazineui',
    CatIcon: IcRocket },
  { name:'IoT Energy Monitor', cat:'Engineering', color:'#FF9500',
    desc:'ESP32 + Supabase + Streamlit. Real-time energy tracking against live weather data across 1–10 devices.',
    tech:['ESP32','Python','Supabase','Open-Meteo'], link:'https://github.com/Da0t/Weather-Adaptive-IoT-Energy-Monitor',
    live:'https://weather-adaptive-io-t-energy-monito.vercel.app',
    CatIcon: IcCode },
  { name:'Lattice (Pylon)', cat:'Engineering', color:'#007AFF',
    desc:'2nd place, Bow Capital Hackathon. Counter-drone mesh system: a deck.gl/Mapbox relay-simulation dashboard plus a Python RTL-SDR RF anomaly detector and gossip-based mesh relay.',
    tech:['Next.js','deck.gl','Python','RTL-SDR'], link:'https://github.com/Da0t/Lattice',
    live:'https://lattice-pm4d.vercel.app/',
    CatIcon: IcCode },
  { name:'Win95 Portfolio', cat:'Engineering', color:'#34C759',
    desc:'This very site — a portfolio reimagined as an interactive Windows 95 desktop, with a native iOS interface on mobile.',
    tech:['React','Vite','react-draggable'], link:'https://github.com/Da0t/Portfolio-Website',
    live:'https://dats-nguyen.vercel.app',
    CatIcon: IcCode },
  { name:'SJ Housing Analysis', cat:'Data Science', color:'#AF52DE',
    desc:'Price-to-income ratios + time-series forecasting on 130 months of San Jose MSA housing data.',
    tech:['Python','Scikit-Learn','Pandas','Jupyter'], link:'https://github.com/Da0t/SJ-housing-analysis',
    CatIcon: IcData },
  { name:'TSwift Recommender', cat:'Data Science', color:'#FF2D55',
    desc:'TF-IDF + audio feature recommender across Taylor Swift\'s full discography.',
    tech:['Python','TF-IDF','Jupyter'], link:'https://github.com/Da0t/TSwift-Song-Recommender',
    CatIcon: IcData },
  { name:'Friends Analysis', cat:'Data Science', color:'#FF9500',
    desc:'Bayesian + bootstrap analysis of character dynamics and viewership drivers across all 10 seasons.',
    tech:['Python','Bayesian Modeling','Jupyter'], link:'https://github.com/Da0t/Friends-Data-Driven-Analysis-for-Enhanced-Engagement',
    CatIcon: IcData },
  { name:'Mila Expense Dashboard', cat:'Data Science', color:'#34C759',
    desc:'Real-time React dashboard visualizing boutique receipt data from Supabase with Sankey, area, radar, and donut charts.',
    tech:['React','Supabase','Recharts','Nivo'], link:'https://github.com/Da0t/Dashboard-Supabase-and-Shenanigans',
    CatIcon: IcData },
  { name:'First Baron Predictor', cat:'Data Science', color:'#AF52DE',
    desc:'Data-science report on whether first Baron control predicts wins in competitive League of Legends, with a scikit-learn win classifier.',
    tech:['Python','scikit-learn','Plotly','Jekyll'], link:'https://github.com/Da0t/dsc80-project-website',
    live:'https://da0t.github.io/dsc80-project-website/',
    CatIcon: IcData },
]

export function ProjectsContent() {
  return (
    <div className="ios-screen">
      {projects.map((p, i) => (
        <div key={i} className="ios-project-card">
          <div className="ios-project-header">
            <div className="ios-project-dot" style={{ background: p.color }} />
            <div>
              <div className="ios-project-name">{p.name}</div>
              <div className="ios-project-cat" style={{ color: p.color }}>
                <p.CatIcon /> {p.cat}
              </div>
            </div>
          </div>
          <p className="ios-project-desc">{p.desc}</p>
          <div className="ios-tags-wrap">
            {p.tech.map(t => <Tag key={t} color={p.color}>{t}</Tag>)}
          </div>
          <div className="ios-project-actions">
            <a href={p.link} target="_blank" rel="noreferrer" className="ios-action-btn">
              View on GitHub
            </a>
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="ios-action-btn ios-action-btn-alt">
                Live Demo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Contact ─────────────────────────────────────────────────── */
export function ContactContent() {
  return (
    <div className="ios-screen">
      <div className="ios-contact-hero">
        <div className="ios-contact-avatar">D</div>
        <h2 className="ios-contact-name">Dat Nguyen</h2>
        <p className="ios-contact-sub">Open to internships & new grad roles</p>
      </div>

      <Section label="Get in Touch">
        <Row icon={<IcMail />} label="Email" value="datq.nguyen06@gmail.com"
          href="mailto:datq.nguyen06@gmail.com" chevron />
        <Divider />
        <Row icon={<IcLinkedin />} label="LinkedIn" value="datnguy3n"
          href="https://www.linkedin.com/in/datnguy3n/" chevron />
        <Divider />
        <Row icon={<IcGithub />} label="GitHub" value="Da0t"
          href="https://github.com/Da0t" chevron last />
      </Section>

      <Section label="Location">
        <Row icon={<IcPin />} label="Based in" value="La Jolla, CA" last />
      </Section>

      <Section label="Quick Links">
        <Row icon={<IcDoc />} label="Resume / CV" href="/Dat_resume.pdf" chevron last />
      </Section>
    </div>
  )
}

/* ── Resume ──────────────────────────────────────────────────── */
export function ResumeContent() {
  return (
    <div className="ios-screen">
      <div className="ios-resume-hero">
        <h1 className="ios-resume-name">Dat Nguyen</h1>
        <p className="ios-resume-contact">
          datq.nguyen06@gmail.com · github.com/Da0t · dats-nguyen.vercel.app
        </p>
        <a href="/Dat_resume.pdf" download className="ios-dl-btn">
          Download PDF
        </a>
      </div>

      <Section label="Education">
        <div className="ios-resume-block">
          <div className="ios-resume-title">University of California, San Diego</div>
          <div className="ios-resume-sub">B.S. Data Science + B.A. Economics · Junior</div>
          <div className="ios-resume-period">Expected June 2028 · La Jolla, CA</div>
        </div>
      </Section>

      <Section label="Experience">
        {[
          { role:'Co-Founder & Founding SWE', org:'Aria AI', period:'Jun 2026 – Present' },
          { role:'Founding Software Engineer', org:'Netra', period:'May 2026 – Present' },
          { role:'Full-Stack Developer Intern', org:'SEO USA', period:'May 2026 – Present' },
          { role:'Software Engineer Lead', org:'AISC @ UCSD', period:'Apr – Jul 2026' },
          { role:'Undergraduate Researcher, ML/AI', org:'Economics Research Lab @ UCSD', period:'Mar – Jun 2026' },
        ].map((e, i, arr) => (
          <div key={i}>
            <div className="ios-resume-block">
              <div className="ios-resume-title">{e.role}</div>
              <div className="ios-resume-sub">{e.org}</div>
              <div className="ios-resume-period">{e.period}</div>
            </div>
            {i < arr.length - 1 && <Divider />}
          </div>
        ))}
      </Section>

      <Section label="Technical Skills">
        <div className="ios-tags-wrap" style={{ padding: '12px 16px' }}>
          {['Python','SQL','TypeScript','React','Next.js','FastAPI','PyTorch',
            'Scikit-Learn','Pandas','Supabase','PostgreSQL','Docker','AWS','Git'].map(s => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Section>
    </div>
  )
}

/* ── Recycle Bin ─────────────────────────────────────────────── */
const deleted = [
  { name:'Sleep_Schedule.exe',      date:'Deleted during finals' },
  { name:'Free_Time.dll',           date:'Deleted Apr 2026' },
  { name:'Easy_Major.txt',          date:'Never existed' },
  { name:'Working_Merge_First_Try', date:'Corrupted immediately' },
  { name:'Social_Life_Q1.doc',      date:'Deleted Sep 2024' },
  { name:'My_Sanity_Hackathon.bak', date:'Deleted 24hr into SDx' },
]

export function RecycleContent() {
  return (
    <div className="ios-screen">
      <div className="ios-recycle-hero">
        <div className="ios-recycle-icon-wrap">
          <IcTrash />
        </div>
        <h2 className="ios-recycle-title">Recycle Bin</h2>
        <p className="ios-recycle-sub">Things Dat sacrificed for code</p>
      </div>
      <Section label="Permanently Deleted">
        {deleted.map((f, i) => (
          <div key={i}>
            <div className="ios-recycle-row">
              <div>
                <div className="ios-recycle-filename">{f.name}</div>
                <div className="ios-recycle-date">{f.date}</div>
              </div>
              <span className="ios-recycle-badge">Deleted</span>
            </div>
            {i < deleted.length - 1 && <Divider />}
          </div>
        ))}
      </Section>
      <p className="ios-recycle-tip">Tip: Dat regrets none of this.</p>
    </div>
  )
}
