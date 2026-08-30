import { useState } from 'react'
import './MobileContent.css'
import {
  EXPERIENCE,
  FEATURED_SKILLS,
  HACKATHON_AWARDS,
  LEADERSHIP,
  PORTFOLIO_PROJECTS,
  PROFILE,
  PROJECT_CATEGORY_COLORS,
  SKILL_GROUPS,
} from '../data/portfolioData'

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
          src="https://avatars.githubusercontent.com/u/179423998?v=4&size=192"
          alt="Dat Nguyen"
          className="ios-avatar"
          width="96"
          height="96"
          loading="lazy"
          decoding="async"
        />
        <h1 className="ios-profile-name">{PROFILE.name}</h1>
        <p className="ios-profile-sub">Data Science + Economics · UC San Diego</p>
        <p className="ios-profile-sub2">Applied AI + geospatial systems · {PROFILE.graduation}</p>
        <div className="ios-social-row">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="ios-social-btn">
            GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="ios-social-btn ios-social-btn-blue">
            LinkedIn
          </a>
        </div>
      </div>

      <Section label="Bio">
        <div className="ios-bio-text">
          {PROFILE.summary}
        </div>
      </Section>

      <Section label="Details">
        <Row icon={<IcGrad />} label="University" value="UC San Diego" />
        <Divider />
        <Row icon={<IcStar />} label="GPA" value={PROFILE.gpa} />
        <Divider />
        <Row icon={<IcCal />} label="Graduation" value={PROFILE.graduation} />
        <Divider />
        <Row icon={<IcMail />} label="Email" value={PROFILE.email} last />
      </Section>

      <Section label="Portfolio Snapshot">
        <Row icon={<IcBriefcase />} label="Experience" value={`${EXPERIENCE.length} roles`} />
        <Divider />
        <Row icon={<IcStar />} label="Leadership" value={`${LEADERSHIP.length} roles`} />
        <Divider />
        <Row icon={<IcStar />} label="Hackathons" value={`${HACKATHON_AWARDS.length} awards`} />
        <Divider />
        <Row icon={<IcCode />} label="Projects" value={`${PORTFOLIO_PROJECTS.length} public projects`} last />
      </Section>

      <Section label="Skills">
        <div className="ios-tags-wrap" style={{ padding: '12px 16px' }}>
          {FEATURED_SKILLS.map(s => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Section>

      <Section label="Contact">
        <Row icon={<IcGithub />} label="GitHub" value="Da0t" href={PROFILE.github} chevron last />
      </Section>
    </div>
  )
}

/* ── Experience ─────────────────────────────────────────────── */
const EXPERIENCE_ICONS = {
  netra: IcCode,
  seo: IcCode,
  research: IcData,
  aisc: IcChart,
  'boa-ai': IcCode,
  dataworks: IcRocket,
  calpirg: IcStar,
}

export function ExperienceContent() {
  const roles = [...EXPERIENCE, ...LEADERSHIP]

  return (
    <div className="ios-screen">
      {roles.map(item => {
        const Icon = EXPERIENCE_ICONS[item.id] ?? IcBriefcase
        return (
        <div key={item.id} className="ios-exp-card">
          <div className="ios-exp-header">
            <div className="ios-exp-icon-wrap" style={{ background: item.color + '20' }}>
              <Icon />
            </div>
            <div className="ios-exp-meta">
              <div className="ios-exp-role">{item.role}</div>
              <div className="ios-exp-org">{item.shortOrg}</div>
              <div className="ios-exp-period">
                {item.type === 'leadership' ? 'Leadership' : item.type === 'research' ? 'Research' : 'Experience'}
              </div>
            </div>
          </div>
          {(item.mobileBullets ?? item.bullets ?? []).length > 0 && (
            <ul className="ios-exp-bullets">
              {(item.mobileBullets ?? item.bullets).slice(0, 2).map(bullet => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
        )
      })}
    </div>
  )
}

/* ── Projects ────────────────────────────────────────────────── */
const PROJECT_ICONS = {
  Fintech: IcChart,
  'AI / ML': IcStar,
  Systems: IcCode,
  Data: IcData,
  'Web / UI': IcRocket,
}

export function ProjectsContent() {
  const featuredProjects = PORTFOLIO_PROJECTS.filter(project => project.featured)
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? PORTFOLIO_PROJECTS : featuredProjects

  return (
    <div className="ios-screen">
      <div className="ios-project-catalog-bar">
        <div>
          <strong>{PORTFOLIO_PROJECTS.length} public projects</strong>
          <span>{showAll ? 'Complete GitHub-backed catalog' : `${featuredProjects.length} featured first`}</span>
        </div>
        <button
          type="button"
          className="ios-catalog-toggle"
          aria-expanded={showAll}
          onClick={() => setShowAll(value => !value)}
        >
          {showAll ? 'Featured' : `Show all ${PORTFOLIO_PROJECTS.length}`}
        </button>
      </div>

      {visibleProjects.map(project => {
        const CatIcon = PROJECT_ICONS[project.category] ?? IcCode
        const color = PROJECT_CATEGORY_COLORS[project.category] ?? '#007AFF'
        return (
        <div key={project.id} className="ios-project-card">
          {project.image && (
            <div className="ios-project-preview">
              <img
                src={project.image}
                alt={project.imageAlt}
                width={project.imageWidth}
                height={project.imageHeight}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
          <div className="ios-project-header">
            <div className="ios-project-dot" style={{ background: color }} />
            <div>
              <div className="ios-project-name">{project.name}</div>
              <div className="ios-project-cat" style={{ color }}>
                <CatIcon /> {project.category}
              </div>
            </div>
          </div>
          {project.award && <div className="ios-project-award">{project.award}</div>}
          <p className="ios-project-desc">{project.description}</p>
          <div className="ios-tags-wrap">
            {project.tech.map(technology => <Tag key={technology} color={color}>{technology}</Tag>)}
          </div>
          <div className="ios-project-actions">
            <a href={project.github} target="_blank" rel="noreferrer" className="ios-action-btn">
              {project.githubLabel}
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="ios-action-btn ios-action-btn-alt">
                Live Demo
              </a>
            )}
          </div>
        </div>
        )
      })}

      {!showAll && (
        <button
          type="button"
          className="ios-catalog-more"
          onClick={() => setShowAll(true)}
        >
          Show all {PORTFOLIO_PROJECTS.length} projects
        </button>
      )}
    </div>
  )
}

/* ── Contact ─────────────────────────────────────────────────── */
export function ContactContent() {
  return (
    <div className="ios-screen">
      <div className="ios-contact-hero">
        <div className="ios-contact-avatar">D</div>
        <h2 className="ios-contact-name">{PROFILE.name}</h2>
        <p className="ios-contact-sub">Applied AI · geospatial systems · defense technology</p>
      </div>

      <Section label="Get in Touch">
        <Row icon={<IcMail />} label="Email" value={PROFILE.email}
          href={`mailto:${PROFILE.email}`} chevron />
        <Divider />
        <Row icon={<IcLinkedin />} label="LinkedIn" value="datnguy3n"
          href={PROFILE.linkedin} chevron />
        <Divider />
        <Row icon={<IcGithub />} label="GitHub" value="Da0t"
          href={PROFILE.github} chevron last />
      </Section>

      <Section label="Location">
        <Row icon={<IcPin />} label="Based in" value={PROFILE.location} last />
      </Section>

      <Section label="Quick Links">
        <Row icon={<IcGithub />} label="GitHub Profile" href={PROFILE.github} chevron last />
      </Section>
    </div>
  )
}

/* ── Resume ──────────────────────────────────────────────────── */
export function ResumeContent() {
  return (
    <div className="ios-screen">
      <div className="ios-resume-hero">
        <h1 className="ios-resume-name">{PROFILE.name}</h1>
        <p className="ios-resume-contact">
          {PROFILE.email} · {PROFILE.githubLabel} · {PROFILE.websiteLabel}
        </p>
        <a href={PROFILE.github} target="_blank" rel="noreferrer" className="ios-dl-btn">
          Open GitHub Profile
        </a>
      </div>

      <Section label="Education">
        <div className="ios-resume-block">
          <div className="ios-resume-title">{PROFILE.school}</div>
          <div className="ios-resume-sub">{PROFILE.degree}</div>
          <div className="ios-resume-period">{PROFILE.graduation} · GPA {PROFILE.gpa}</div>
        </div>
      </Section>

      <Section label="Experience">
        {EXPERIENCE.map((item, i) => (
          <div key={item.id}>
            <div className="ios-resume-block">
              <div className="ios-resume-title">{item.role}</div>
              <div className="ios-resume-sub">{item.shortOrg}</div>
            </div>
            {i < EXPERIENCE.length - 1 && <Divider />}
          </div>
        ))}
      </Section>

      <Section label="Leadership">
        {LEADERSHIP.map((item, i) => (
          <div key={item.id}>
            <div className="ios-resume-block">
              <div className="ios-resume-title">{item.role}</div>
              <div className="ios-resume-sub">{item.shortOrg}</div>
            </div>
            {i < LEADERSHIP.length - 1 && <Divider />}
          </div>
        ))}
      </Section>

      <Section label="10 Hackathon Awards">
        {HACKATHON_AWARDS.map((award, i) => (
          <div key={award.id}>
            <a href={award.href} target="_blank" rel="noreferrer" className="ios-row-link">
              <div className="ios-resume-block">
                <div className="ios-resume-title">{award.name}</div>
                <div className="ios-resume-sub">{award.award}</div>
                <div className="ios-resume-period">{award.summary}</div>
              </div>
            </a>
            {i < HACKATHON_AWARDS.length - 1 && <Divider />}
          </div>
        ))}
      </Section>

      <Section label="Technical Skills">
        <div className="ios-tags-wrap" style={{ padding: '12px 16px' }}>
          {SKILL_GROUPS.flatMap(group => group.items).map(s => (
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
