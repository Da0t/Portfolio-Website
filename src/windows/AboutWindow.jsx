import './AboutWindow.css'
import { FEATURED_SKILLS, PROFILE } from '../data/portfolioData'

const specs = [
  { label: 'Full Name', value: PROFILE.name },
  { label: 'Processor', value: 'Python · TypeScript · SQL @ 100MHz' },
  { label: 'Memory', value: 'Data Science + Economics (Dual-Core)' },
  { label: 'Storage', value: 'Financial simulations · CRM forecasting · 3 project awards' },
  { label: 'OS', value: `UC San Diego · ${PROFILE.degree} · Class of 2028` },
  { label: 'Display', value: 'Full-Stack · Data · Financial Systems' },
  { label: 'Location', value: `${PROFILE.location} (San Diego)` },
  { label: 'Network', value: PROFILE.availability },
]

// Tries /public/photo.jpg first; falls back to GitHub avatar
const PHOTO_LOCAL   = '/photo.jpg'
const PHOTO_GITHUB  = 'https://avatars.githubusercontent.com/u/179423998?v=4'

export default function AboutWindow() {
  return (
    <div className="about-window">
      {/* Header: photo + name */}
      <div className="about-header">
        <div className="about-photo-frame inset">
          <img
            src={PHOTO_LOCAL}
            alt="Dat Nguyen"
            className="about-photo"
            onError={e => { e.currentTarget.src = PHOTO_GITHUB }}
          />
        </div>

        <div className="about-header-text">
          <div className="about-name">{PROFILE.name}</div>
          <div className="about-role">
            {PROFILE.headline} &nbsp;|&nbsp; UC San Diego · Class of 2028
          </div>
          <div className="about-social-links">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="about-social-btn raised"
            >
              <img src="/icons/network.svg" alt="" className="about-social-icon" />
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="about-social-btn raised"
            >
              <img src="/icons/linkedin.svg" alt="" className="about-social-icon" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="about-divider" />

      <div className="about-bio">
        <p>{PROFILE.summary}</p>
      </div>

      <div className="about-divider" />

      <div className="groupbox95" style={{ margin: '8px' }}>
        <span className="groupbox95-label">System Properties — Dat Nguyen v1.0</span>
        <table className="about-specs">
          <tbody>
            {specs.map(({ label, value }) => (
              <tr key={label}>
                <td className="spec-label">{label}:</td>
                <td className="spec-value">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="groupbox95" style={{ margin: '8px' }}>
        <span className="groupbox95-label">Installed Software</span>
        <div className="skill-chips">
          {FEATURED_SKILLS.map(s => (
            <span key={s} className="skill-chip raised">{s}</span>
          ))}
        </div>
      </div>

      <div className="about-copyright">
        <div className="about-divider" />
        <p>© {new Date().getFullYear()} Dat Nguyen. All rights reserved.</p>
        <p>This portfolio and its contents may not be reproduced without permission.</p>
      </div>
    </div>
  )
}
