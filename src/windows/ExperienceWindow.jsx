import './ExperienceWindow.css'
import { EXPERIENCE, LEADERSHIP } from '../data/portfolioData'

const TYPE_COLORS = { work: '#000080', research: '#005A00', leadership: '#7A3000' }
const TYPE_LABELS = { work: 'Work', research: 'Research', leadership: 'Leadership' }

export default function ExperienceWindow() {
  const roles = [...EXPERIENCE, ...LEADERSHIP]

  return (
    <div className="exp-window">
      {roles.map(e => (
        <div key={e.id} className="exp-entry raised">
          <div className="exp-header">
            <div className="exp-left">
              <div className="exp-role">{e.role}</div>
              <div className="exp-org">
                {e.org}
                {e.location && <> — <span className="exp-loc">{e.location}</span></>}
              </div>
            </div>
            <div className="exp-right">
              {e.period && <div className="exp-period">{e.period}</div>}
              <span
                className="exp-type-badge"
                style={{ background: TYPE_COLORS[e.type] }}
              >
                {TYPE_LABELS[e.type]}
              </span>
            </div>
          </div>

          {e.bullets?.length > 0 && (
            <ul className="exp-bullets">
              {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          )}

          {e.tags?.length > 0 && (
            <div className="exp-tags">
              {e.tags.map(t => <span key={t} className="skill-chip raised">{t}</span>)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
