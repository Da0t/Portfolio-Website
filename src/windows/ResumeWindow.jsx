import './ResumeWindow.css'
import {
  EXPERIENCE,
  PROFILE,
  RESUME_PROJECTS,
  SKILL_GROUPS,
} from '../data/portfolioData'

export default function ResumeWindow() {
  return (
    <div className="resume-window">
      <div className="resume-header">
        <div className="resume-name">{PROFILE.name}</div>
        <div className="resume-contact-line">
          {PROFILE.email} &nbsp;·&nbsp; {PROFILE.phone} &nbsp;·&nbsp;
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
            <span className="resume-job-period">{PROFILE.graduation}</span>
          </div>
          <ul className="resume-bullets">
            <li><strong>Coursework:</strong> Data Structures and Algorithms, Object-Oriented Programming, Data Science, Data Management</li>
            <li><strong>Certifications:</strong> Operating Systems Principles, Docker &amp; Kubernetes Principles, Intermediate SQL, Claude 101, AI Fluency</li>
          </ul>
        </div>
      </section>

      <div className="resume-divider" />

      <section className="resume-section">
        <div className="resume-section-title">Experience</div>
        {EXPERIENCE.map(item => (
          <div className="resume-job" key={item.id}>
            <div className="resume-job-header">
              <span className="resume-job-role">{item.role} &mdash; {item.org}</span>
              <span className="resume-job-period">{item.period}</span>
            </div>
            <ul className="resume-bullets">
              {item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <div className="resume-divider" />

      <section className="resume-section">
        <div className="resume-section-title">Projects</div>
        {RESUME_PROJECTS.map(project => (
          <div className="resume-job" key={project.id}>
            <div className="resume-job-header">
              <span className="resume-job-role">{project.name} &mdash; <em>{project.award}</em></span>
              <span className="resume-job-period">
                <a href={project.href} target="_blank" rel="noreferrer">{project.hrefLabel}</a>
              </span>
            </div>
            <ul className="resume-bullets">
              {project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
            </ul>
          </div>
        ))}
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
        <a href="/Dat_resume.pdf" download className="btn95 default-btn">Save As... (PDF)</a>
        <a href="/Dat_resume.pdf" target="_blank" rel="noreferrer" className="btn95">Open</a>
      </div>
    </div>
  )
}
