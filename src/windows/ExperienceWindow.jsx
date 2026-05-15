import './ExperienceWindow.css'

const experience = [
  {
    role: 'Data Analytics Intern',
    org: 'Commonpoint Queens',
    location: 'Remote',
    period: 'Fall 2026',
    type: 'work',
    bullets: [
      'Upcoming role — data analytics internship focused on driving insights from organizational data',
    ],
    tags: ['Data Analytics', 'Python', 'SQL'],
  },
  {
    role: 'Tech Developer Intern',
    org: 'SEO (Sponsors for Educational Opportunity)',
    location: 'Remote',
    period: 'May 2026 – Present',
    type: 'work',
    bullets: [
      'Selected for competitive full-stack engineering program with 35–40 hrs/week of synchronous SWE training',
      '1:1 engineering manager coaching and partner company placement',
    ],
    tags: ['Full-Stack', 'SWE Training'],
  },
  {
    role: 'Software Engineer',
    org: 'AISC @ UC San Diego',
    location: 'La Jolla, CA',
    period: 'Apr 2026 – Present',
    type: 'work',
    bullets: [
      'Develop and maintain the AISC website serving 250+ members using Next.js, React, and CSS on Netlify',
      'Reduced load times by 20% via ISR caching to improve access to events and resources',
      'Built a password-protected admin portal using Supabase Auth for non-technical leads',
    ],
    tags: ['Next.js', 'React', 'Supabase', 'Netlify'],
  },
  {
    role: 'Undergraduate Researcher',
    org: 'Economics Research Lab @ UC San Diego',
    location: 'La Jolla, CA',
    period: 'Mar 2026 – Jun 2026',
    type: 'research',
    bullets: [
      'Curated and preprocessed 2,000+ satellite images for Indonesia using QGIS, Python, and GeoPandas',
      'Trained a Random Forest classifier achieving 0.982 ROC-AUC, 0.92 F1, 96.6% recall, 87.8% precision',
    ],
    tags: ['Python', 'QGIS', 'Scikit-Learn', 'ML'],
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
