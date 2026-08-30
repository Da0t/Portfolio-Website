import {
  EXPERIENCE,
  HACKATHON_AWARDS,
  LEADERSHIP,
  PORTFOLIO_PROJECTS,
  PROFILE,
} from '../data/portfolioData'
import './RecruiterWindow.css'

const SPOTLIGHT_IDS = ['northstar', 'quota-signal', 'aria-ai', 'pylon']

export default function RecruiterWindow({ onOpen }) {
  const spotlightProjects = SPOTLIGHT_IDS
    .map(id => PORTFOLIO_PROJECTS.find(project => project.id === id))
    .filter(Boolean)

  return (
    <div className="recruiter-window">
      <header className="recruiter-hero sunken">
        <div>
          <div className="recruiter-kicker">Recruiter Quick View</div>
          <h1>{PROFILE.name}</h1>
          <p className="recruiter-headline">{PROFILE.headline}</p>
          <p className="recruiter-education">
            UC San Diego · {PROFILE.degree} · {PROFILE.graduation} · GPA {PROFILE.gpa}
          </p>
        </div>
        <p className="recruiter-summary">{PROFILE.summary}</p>
      </header>

      <section className="recruiter-stats" aria-label="Portfolio totals">
        <div className="recruiter-stat raised"><strong>{EXPERIENCE.length}</strong><span>Experience roles</span></div>
        <div className="recruiter-stat raised"><strong>{LEADERSHIP.length}</strong><span>Leadership roles</span></div>
        <div className="recruiter-stat raised"><strong>{HACKATHON_AWARDS.length}</strong><span>Hackathon awards</span></div>
        <div className="recruiter-stat raised"><strong>{PORTFOLIO_PROJECTS.length}</strong><span>Public projects</span></div>
      </section>

      <div className="recruiter-grid">
        <section className="groupbox95 recruiter-panel">
          <span className="groupbox95-label">Experience at a glance</span>
          <div className="recruiter-role-list">
            {EXPERIENCE.map(item => (
              <div className="recruiter-role" key={item.id}>
                <strong>{item.role}</strong>
                <span>{item.shortOrg}</span>
              </div>
            ))}
          </div>
          <button type="button" className="btn95" onClick={() => onOpen?.('experience')}>
            Open Experience →
          </button>
        </section>

        <section className="groupbox95 recruiter-panel">
          <span className="groupbox95-label">Four projects to scan first</span>
          <div className="recruiter-project-list">
            {spotlightProjects.map(project => (
              <a
                className="recruiter-project"
                href={project.github}
                target="_blank"
                rel="noreferrer"
                key={project.id}
              >
                <span className="recruiter-project-name">{project.name}</span>
                <span className="recruiter-project-category">{project.category}</span>
                <span className="recruiter-project-summary">{project.scanLine}</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <footer className="recruiter-actions raised">
        <button type="button" className="btn95 default-btn" onClick={() => onOpen?.('projects')}>
          Browse all {PORTFOLIO_PROJECTS.length} projects
        </button>
        <a className="btn95" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
        <a className="btn95" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="btn95" href={`mailto:${PROFILE.email}`}>Email Dat</a>
      </footer>
    </div>
  )
}
