import './AboutWindow.css'

const specs = [
  { label: 'Full Name',  value: 'Dat Nguyen' },
  { label: 'Processor',  value: 'Python · TypeScript · React  @ 100MHz' },
  { label: 'Memory',     value: 'Data Science + Economics (Dual-Core)' },
  { label: 'Storage',    value: 'Multiple shipped apps · 3 hackathon awards · 2,000+ satellite images processed' },
  { label: 'OS',         value: 'UCSD Junior · B.S. Data Science + B.A. Economics' },
  { label: 'Display',    value: 'Full-Stack  +  Machine Learning' },
  { label: 'Location',   value: 'La Jolla, CA (San Diego)' },
  { label: 'Network',    value: 'Open to internships & new grad roles — fast connection' },
]

const skills = [
  'Python', 'TypeScript', 'React', 'Next.js',
  'FastAPI', 'SQL', 'Java', 'PyTorch',
  'Scikit-Learn', 'Pandas', 'Supabase', 'PostgreSQL',
  'Docker', 'AWS', 'QGIS', 'Tailwind CSS', 'Git',
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
          <div className="about-name">Dat Nguyen</div>
          <div className="about-role">
            Data Science &amp; Economics · UCSD &nbsp;|&nbsp; Co-Founder &amp; SWE @ Aria AI &nbsp;|&nbsp; 🏆 1st Place — Berkeley AI Hackathon
          </div>
          <div className="about-social-links">
            <a
              href="https://github.com/Da0t"
              target="_blank"
              rel="noreferrer"
              className="about-social-btn raised"
            >
              <img src="/icons/network.svg" alt="" className="about-social-icon" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/datnguy3n/"
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
        <p>
          I'm a junior at UC San Diego who builds things end-to-end — consumer AI wearables,
          full-stack web apps, and ML classifiers on satellite imagery. I care about writing
          code that actually ships and systems that hold up under real conditions.
          Currently co-founding Aria&nbsp;AI and building full-stack systems at Netra and SEO&nbsp;USA.
          Always open to interesting problems.
        </p>
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
          {skills.map(s => (
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
