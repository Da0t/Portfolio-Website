import { useState } from 'react'
import {
  PORTFOLIO_PROJECTS,
  PROJECT_CATEGORIES,
  PROJECT_CATEGORY_COLORS,
} from '../data/portfolioData'
import './ProjectsWindow.css'

export default function ProjectsWindow() {
  const [activeCategory, setCategory] = useState('All')
  const [selected, setSelected] = useState(PORTFOLIO_PROJECTS[0].id)

  const filtered = activeCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(project => project.category === activeCategory)
  const project = PORTFOLIO_PROJECTS.find(item => item.id === selected)

  function selectCategory(category) {
    const nextProjects = category === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter(item => item.category === category)
    setCategory(category)
    setSelected(nextProjects[0]?.id ?? null)
  }

  return (
    <div className="projects-window">
      <div className="projects-toolbar raised" aria-label="Project categories">
        {PROJECT_CATEGORIES.map(category => (
          <button
            type="button"
            key={category}
            className={`btn95 cat-btn ${activeCategory === category ? 'pressed' : ''}`}
            aria-pressed={activeCategory === category}
            onClick={() => selectCategory(category)}
          >
            {category}
          </button>
        ))}
        <div className="toolbar-sep" />
        <span className="toolbar-label">{filtered.length} project(s)</span>
      </div>

      <div className="projects-body">
        <div className="projects-filelist sunken" aria-label="Project list">
          <div className="filelist-header">
            <span className="col-icon" />
            <span className="col-name">Name</span>
            <span className="col-cat">Category</span>
            <span className="col-date">Year</span>
          </div>

          {filtered.map(item => (
            <button
              type="button"
              key={item.id}
              className={`filelist-row ${selected === item.id ? 'selected' : ''}`}
              aria-pressed={selected === item.id}
              onClick={() => setSelected(item.id)}
              onDoubleClick={() => window.open(item.github, '_blank', 'noopener,noreferrer')}
            >
              <img
                src={item.type === 'folder' ? '/icons/folder.svg' : '/icons/file.svg'}
                alt=""
                className="file-icon"
              />
              <span className="col-name">{item.name}</span>
              <span
                className="col-cat"
                style={{ color: selected === item.id ? 'inherit' : PROJECT_CATEGORY_COLORS[item.category] }}
              >
                {item.category}
              </span>
              <span className="col-date">{item.year}</span>
            </button>
          ))}
        </div>

        {project && (
          <div className="projects-detail">
            <div className="detail-icon-row">
              <img
                src={project.type === 'folder' ? '/icons/folder.svg' : '/icons/file.svg'}
                alt=""
                className="detail-icon"
              />
              <strong>{project.name}</strong>
            </div>

            <div
              className="detail-badge"
              style={{ background: PROJECT_CATEGORY_COLORS[project.category] ?? '#000080' }}
            >
              {project.category}
            </div>

            {project.award && <div className="detail-award">{project.award}</div>}

            {project.image && (
              <div className="detail-preview sunken">
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
              </div>
            )}

            <div className="about-divider" style={{ margin: '2px 0' }} />

            <p className="detail-desc">{project.description}</p>

            <div className="detail-tech">
              {project.tech.map(technology => (
                <span key={technology} className="skill-chip raised">{technology}</span>
              ))}
            </div>

            <div className="detail-actions">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn95 default-btn"
              >
                {project.githubLabel} →
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn95"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
