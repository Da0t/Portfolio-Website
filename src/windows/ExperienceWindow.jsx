import './ExperienceWindow.css'
import { EXPERIENCE } from '../data/portfolioData'

const TYPE_COLORS = { work: '#000080', research: '#005A00', leadership: '#7A3000' }
const TYPE_LABELS = { work: 'Work', research: 'Research', leadership: 'Leadership' }

export default function ExperienceWindow() {
  return (
    <div className="exp-window">
      {EXPERIENCE.map(e => (
        <div key={e.id} className="exp-entry raised">
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
