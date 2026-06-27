import './ExperienceWindow.css'

const experience = [
  {
    role: 'Co-Founder & Founding Software Engineer',
    org: 'Aria AI',
    location: 'San Jose, CA',
    period: 'Jun 2026 – Present',
    type: 'work',
    bullets: [
      'Co-founded a consumer wearable AI startup, driving a launch to 25,000+ views in 24 hours and selection into Deepgram\'s startup program with 1,000+ sponsored API credits',
      'Shipped an early-access conversion funnel via a token-driven Tailwind design system across 10+ statically-generated components at a sub-140 KB first-load budget',
      'Eliminated broken production deploys with a GitHub Actions CI pipeline running lint, type-check, and smoke tests',
    ],
    tags: ['Tailwind CSS', 'GitHub Actions', 'Deepgram', 'Startup'],
  },
  {
    role: 'Founding Software Engineer',
    org: 'Netra',
    location: 'San Diego, CA',
    period: 'May 2026 – Present',
    type: 'work',
    bullets: [
      'Deployed the website for a $100k-funded startup via Nginx, Cloudflare, and GitHub Actions for automated testing',
      'Designed the company visual identity — logo, website, investor-facing pitch decks, and marketing materials',
    ],
    tags: ['Nginx', 'Cloudflare', 'CI/CD', 'Design'],
  },
  {
    role: 'Full-Stack Developer Intern',
    org: 'SEO USA',
    location: 'New York, NY (Remote)',
    period: 'May 2026 – Present',
    type: 'work',
    bullets: [
      'Built a containerized RESTful API with Python, FastAPI, and Docker, using Supabase and Firebase for auth and access control',
      'Improved PostgreSQL query performance by 15% via execution plan analysis and indexing on high-cardinality fields',
      'Delivered full-stack features across a React frontend and Python backend in agile sprints with CI/CD via GitHub Actions',
    ],
    tags: ['FastAPI', 'Docker', 'PostgreSQL', 'React'],
  },
  {
    role: 'Software Engineer Lead',
    org: 'AISC @ UC San Diego',
    location: 'La Jolla, CA',
    period: 'Apr 2026 – Jul 2026',
    type: 'work',
    bullets: [
      'Built a production platform serving 350+ members with Next.js, React, and Tailwind CSS, achieving a 20% load-time reduction via ISR caching',
      'Improved data retrieval by 60% migrating events from static JSON to Supabase PostgreSQL with schema design and RLS',
    ],
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Supabase'],
  },
  {
    role: 'Undergraduate Researcher, ML/AI',
    org: 'Economics Research Lab @ UC San Diego',
    location: 'La Jolla, CA',
    period: 'Mar 2026 – Jun 2026',
    type: 'research',
    bullets: [
      'Trained a Random Forest classifier to 0.982 ROC-AUC and 0.92 F1 on informal settlement detection',
      'Curated and preprocessed 2,000+ satellite images using QGIS, Python, and GeoPandas',
    ],
    tags: ['Python', 'QGIS', 'GeoPandas', 'ML'],
  },
  {
    role: 'VP Project Operations',
    org: 'DataWorks @ UC San Diego',
    location: 'La Jolla, CA',
    period: 'Mar 2026 – Present',
    type: 'leadership',
    bullets: [
      'Lead a 10-person consulting team building a receipt scanning app with LLM-powered extraction and analytics',
      'Architecting pipeline: camera capture → Supabase storage → client-facing Next.js dashboard',
    ],
    tags: ['Leadership', 'LLM', 'Next.js', 'Supabase'],
  },
  {
    role: 'Campaign Lead',
    org: 'CALPIRG Students – UC San Diego Chapter',
    location: 'La Jolla, CA',
    period: 'Dec 2024 – Jan 2026',
    type: 'leadership',
    bullets: [
      'Logged 200+ volunteer hours; trained 6 volunteers on outreach and data collection',
      'Built Excel dashboards and pivot tables to present campaign metrics and drive resource allocation',
    ],
    tags: ['Leadership', 'Data Analysis', 'Excel'],
  },
]

const TYPE_COLORS = { work: '#000080', research: '#005A00', leadership: '#7A3000' }
const TYPE_LABELS = { work: 'Work', research: 'Research', leadership: 'Leadership' }

export default function ExperienceWindow() {
  return (
    <div className="exp-window">
      {experience.map((e, i) => (
        <div key={i} className="exp-entry raised">
          <div className="exp-header">
            <div className="exp-left">
              <div className="exp-role">{e.role}</div>
              <div className="exp-org">{e.org} — <span className="exp-loc">{e.location}</span></div>
            </div>
            <div className="exp-right">
              <div className="exp-period">{e.period}</div>
              <span
                className="exp-type-badge"
                style={{ background: TYPE_COLORS[e.type] }}
              >
                {TYPE_LABELS[e.type]}
              </span>
            </div>
          </div>

          <ul className="exp-bullets">
            {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
          </ul>

          <div className="exp-tags">
            {e.tags.map(t => <span key={t} className="skill-chip raised">{t}</span>)}
          </div>
        </div>
      ))}
    </div>
  )
}
