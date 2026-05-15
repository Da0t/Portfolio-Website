import './MobileContent.css'

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
      {/* Hero */}
      <div className="ios-profile-hero">
        <img
          src="/photo.jpg"
          alt="Dat Nguyen"
          className="ios-avatar"
          onError={e => { e.currentTarget.src = 'https://avatars.githubusercontent.com/u/179423998?v=4' }}
        />
        <h1 className="ios-profile-name">Dat Nguyen</h1>
        <p className="ios-profile-sub">Data Science + Economics · UCSD</p>
        <p className="ios-profile-sub2">🏆 SDx Hackathon Winner · SWE Intern @ SEO</p>
        <div className="ios-social-row">
          <a href="https://github.com/Da0t" target="_blank" rel="noreferrer" className="ios-social-btn">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/dat-nguyen-b1b554297/" target="_blank" rel="noreferrer" className="ios-social-btn ios-social-btn-blue">
            LinkedIn
          </a>
        </div>
      </div>

      <Section label="Bio">
        <div className="ios-bio-text">
          I build things end-to-end — multimodal AI pipelines, full-stack web apps,
          and ML classifiers on satellite imagery. I care about writing code that actually
          ships and systems that hold up under real conditions.
        </div>
      </Section>

      <Section label="System Info">
        <Row icon="🎓" label="University" value="UC San Diego" />
        <Divider />
        <Row icon="📍" label="Location" value="La Jolla, CA" />
        <Divider />
        <Row icon="📅" label="Graduation" value="June 2028" />
        <Divider />
        <Row icon="📧" label="Email" value="datq.nguyen06@gmail.com" last />
      </Section>

      <Section label="Skills">
        <div className="ios-tags-wrap" style={{ padding: '12px 16px' }}>
          {['Python','TypeScript','React','Next.js','FastAPI','SQL','PyTorch',
            'Scikit-Learn','Pandas','Supabase','QGIS','Tailwind CSS','Git'].map(s => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Section>

      <Section label="Contact">
        <Row icon="💻" label="GitHub" value="Da0t" href="https://github.com/Da0t" chevron last />
      </Section>
    </div>
  )
}

/* ── Experience ─────────────────────────────────────────────── */
const jobs = [
  {
    role: 'Data Analytics Intern',
    org: 'Commonpoint Queens',
    period: 'Fall 2026',
    type: 'work',
    color: '#FF9500',
    emoji: '📊',
    bullets: ['Upcoming data analytics internship'],
  },
  {
    role: 'Tech Developer Intern',
    org: 'SEO (Sponsors for Educational Opportunity)',
    period: 'May 2026 – Present',
    type: 'work',
    color: '#007AFF',
    emoji: '💼',
    bullets: [
      'Competitive full-stack SWE program, 35–40 hrs/week',
      '1:1 engineering manager coaching + partner company placement',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'AISC @ UC San Diego',
    period: 'Apr 2026 – Present',
    type: 'work',
    color: '#5856D6',
    emoji: '🤖',
    bullets: [
      'Website serving 250+ members — reduced load by 20% via ISR caching',
      'Built password-protected admin portal with Supabase Auth',
    ],
  },
  {
    role: 'Undergraduate Researcher',
    org: 'Economics Research Lab @ UCSD',
    period: 'Mar – Jun 2026',
    type: 'research',
    color: '#34C759',
    emoji: '🛰️',
    bullets: [
      'Preprocessed 2,000+ satellite images using QGIS, Python, GeoPandas',
      'Random Forest: 0.982 ROC-AUC · 0.92 F1 · 96.6% recall',
    ],
  },
  {
    role: 'VP Project Operations',
    org: 'DataWorks @ UC San Diego',
    period: 'Mar 2026 – Present',
    type: 'leadership',
    color: '#FF2D55',
    emoji: '🧑‍💼',
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
    emoji: '📣',
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
            <div className="ios-exp-emoji-wrap" style={{ background: j.color + '20' }}>
              <span className="ios-exp-emoji">{j.emoji}</span>
            </div>
            <div className="ios-exp-meta">
              <div className="ios-exp-role">{j.role}</div>
              <div className="ios-exp-org">{j.org}</div>
              <div className="ios-exp-period">{j.period}</div>
            </div>
          </div>
          {j.bullets.filter(b => b !== 'Upcoming data analytics internship').length > 0 && (
            <ul className="ios-exp-bullets">
              {j.bullets.filter(b => b !== 'Upcoming data analytics internship').map((b, k) => (
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
  { name:'Rewind.', cat:'🏆 Hackathon', color:'#007AFF',
    desc:'1st place SDx Hackathon. AI fork-and-resume pipeline with a typed Omnara API client for 6 endpoints.',
    tech:['Python','Next.js','TypeScript','Omnara API'], link:'https://github.com/Da0t' },
  { name:'Atlas.', cat:'🏆 Hackathon', color:'#5856D6',
    desc:'Multimodal RAG pipeline (TwelveLabs + Claude Sonnet 4.6). Filters ~90% cross-video noise. Study suite with notes, flashcards, PDF problems.',
    tech:['Next.js','FastAPI','SQLite','TwelveLabs','Claude API'], link:'https://github.com/Da0t' },
  { name:'SpectraStruct', cat:'🏆 Hackathon', color:'#34C759',
    desc:'DiamondHacks — molecular ID from NMR/MS/IR spectra. Top-10 candidates with 3D conformers.',
    tech:['FastAPI','RDKit','Next.js','MIST (MIT)'], link:'https://github.com/Da0t/SpectraStruct' },
  { name:'IoT Energy Monitor', cat:'⚙️ Engineering', color:'#FF9500',
    desc:'ESP32 + Supabase + Streamlit. Real-time energy tracking against live weather data across 1–10 devices.',
    tech:['ESP32','Python','Supabase','Open-Meteo'], link:'https://github.com/Da0t/Weather-Adaptive-IoT-Energy-Monitor',
    live:'https://weather-adaptive-io-t-energy-monito.vercel.app' },
  { name:'Create', cat:'🌐 Open Source', color:'#FF2D55',
    desc:'Motion & 3D primitive library with an AI instruction layer for building polished web experiences.',
    tech:['TypeScript'], link:'https://github.com/Da0t/Create' },
  { name:'SJ Housing Analysis', cat:'📊 Data Science', color:'#AF52DE',
    desc:'Price-to-income ratios + time-series forecasting on 130 months of San Jose MSA housing data.',
    tech:['Python','Scikit-Learn','Pandas','Jupyter'], link:'https://github.com/Da0t/SJ-housing-analysis' },
  { name:'TSwift Recommender', cat:'📊 Data Science', color:'#FF2D55',
    desc:'TF-IDF + audio feature recommender across Taylor Swift\'s full discography.',
    tech:['Python','TF-IDF','Jupyter'], link:'https://github.com/Da0t/TSwift-Song-Recommender' },
  { name:'Friends Analysis', cat:'📊 Data Science', color:'#FF9500',
    desc:'Bayesian + bootstrap analysis of character dynamics and viewership drivers across all 10 seasons.',
    tech:['Python','Bayesian Modeling','Jupyter'], link:'https://github.com/Da0t/Friends-Data-Driven-Analysis-for-Enhanced-Engagement' },
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
              <div className="ios-project-cat">{p.cat}</div>
            </div>
          </div>
          <p className="ios-project-desc">{p.desc}</p>
          <div className="ios-tags-wrap">
            {p.tech.map(t => <Tag key={t} color={p.color}>{t}</Tag>)}
          </div>
          <div className="ios-project-actions">
            <a href={p.link} target="_blank" rel="noreferrer" className="ios-action-btn">
              View on GitHub ›
            </a>
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="ios-action-btn ios-action-btn-alt">
                Live Demo ›
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
        <Row icon="📧" label="Email" value="datq.nguyen06@gmail.com"
          href="mailto:datq.nguyen06@gmail.com" chevron />
        <Divider />
        <Row icon="💼" label="LinkedIn" value="dat-nguyen"
          href="https://www.linkedin.com/in/dat-nguyen-b1b554297/" chevron />
        <Divider />
        <Row icon="🐙" label="GitHub" value="Da0t"
          href="https://github.com/Da0t" chevron last />
      </Section>

      <Section label="Location">
        <Row icon="📍" label="Based in" value="La Jolla, CA" last />
      </Section>

      <Section label="Quick Links">
        <Row icon="📄" label="Resume / CV" href="/Dat_resume.pdf" chevron last />
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
          datq.nguyen06@gmail.com · github.com/Da0t
        </p>
        <a href="/Dat_resume.pdf" download className="ios-dl-btn">
          ⬇ Download PDF
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
          { role:'Data Analytics Intern', org:'Commonpoint Queens', period:'Fall 2026' },
          { role:'Tech Developer Intern', org:'SEO', period:'May 2026 – Present' },
          { role:'Software Engineer', org:'AISC @ UCSD', period:'Apr 2026 – Present' },
          { role:'Undergraduate Researcher', org:'Economics Research Lab @ UCSD', period:'Mar – Jun 2026' },
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
            'Scikit-Learn','Pandas','Supabase','QGIS','Git'].map(s => (
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
        <div className="ios-recycle-icon">🗑️</div>
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
