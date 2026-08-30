import './ResumeWindow.css'
import {
  EXPERIENCE,
  HACKATHON_AWARDS,
  LEADERSHIP,
  PROFILE,
  SKILL_GROUPS,
} from '../data/portfolioData'

export default function ResumeWindow() {
  return (
    <div className="resume-window">
      <div className="resume-header">
        <div className="resume-name">{PROFILE.name}</div>
        <div className="resume-contact-line">
          {PROFILE.email} &nbsp;·&nbsp;
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">{PROFILE.linkedinLabel}</a>
          &nbsp;·&nbsp;
          <a href={PROFILE.github} target="_blank" rel="noreferrer">{PROFILE.githubLabel}</a>
          &nbsp;·&nbsp;
          <a href={PROFILE.website} target="_blank" rel="noreferrer">{PROFILE.websiteLabel}</a>
        </div>
      </div>

      <div className="resume-divider" />

      <section className="resume-section">
        <div className="resume-section-title">Education</div>
        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">{PROFILE.school}</span>
            <span className="resume-job-period">{PROFILE.location}</span>
          </div>
          <div className="resume-job-header">
            <span className="resume-job-company">{PROFILE.degree}</span>
            <span className="resume-job-period">{PROFILE.graduation} · GPA {PROFILE.gpa}</span>
          </div>
        </div>
      </section>

      <div className="resume-divider" />

      <section className="resume-section">
        <div className="resume-section-title">Experience</div>
        {EXPERIENCE.map(item => (
          <div className="resume-job" key={item.id}>
            <div className="resume-job-header">
              <span className="resume-job-role">{item.role} &mdash; {item.org}</span>
              {item.period && <span className="resume-job-period">{item.period}</span>}
            </div>
          </div>
        ))}
      </section>

      <div className="resume-divider" />

      <section className="resume-section">
        <div className="resume-section-title">Leadership</div>
        {LEADERSHIP.map(item => (
          <div className="resume-job" key={item.id}>
            <div className="resume-job-header">
              <span className="resume-job-role">{item.role} &mdash; {item.org}</span>
            </div>
          </div>
        ))}
      </section>

      <div className="resume-divider" />

      <section className="resume-section">
        <div className="resume-section-title">Hackathon Awards</div>
        {HACKATHON_AWARDS.map(project => (
          <div className="resume-job" key={project.id}>
            <div className="resume-job-header">
              <span className="resume-job-role">{project.name} &mdash; <em>{project.award}</em></span>
              <span className="resume-job-period">
                <a href={project.href} target="_blank" rel="noreferrer">Repository</a>
              </span>
            </div>
            <p>{project.summary}</p>
          </div>
        ))}
        <div className="resume-job"><strong>Selected:</strong> Deepgram Startup Program (Aria AI)</div>
      </section>

      <div className="resume-divider" />

      <section className="resume-section">
        <div className="resume-section-title">Technical Skills</div>
        <div className="resume-job">
          {SKILL_GROUPS.map(group => (
            <p key={group.label}><strong>{group.label}:</strong> {group.items.join(', ')}</p>
          ))}
        </div>
      </section>

      <div className="resume-actions">
        <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn95 default-btn">
          Open GitHub Profile
        </a>
      </div>
    </div>
  )
}
