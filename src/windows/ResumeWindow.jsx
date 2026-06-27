import './ResumeWindow.css'

export default function ResumeWindow() {
  return (
    <div className="resume-window">
      <div className="resume-header">
        <div className="resume-name">Dat Nguyen</div>
        <div className="resume-contact-line">
          datq.nguyen06@gmail.com &nbsp;·&nbsp; (408) 856-8287 &nbsp;·&nbsp;
          <a href="https://www.linkedin.com/in/datnguy3n/" target="_blank" rel="noreferrer">linkedin.com/in/datnguy3n</a>
          &nbsp;·&nbsp;
          <a href="https://github.com/Da0t" target="_blank" rel="noreferrer">github.com/Da0t</a>
          &nbsp;·&nbsp;
          <a href="https://dats-nguyen.vercel.app" target="_blank" rel="noreferrer">dats-nguyen.vercel.app</a>
        </div>
      </div>

      <div className="resume-divider" />

      {/* Education */}
      <section className="resume-section">
        <div className="resume-section-title">Education</div>
        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">University of California, San Diego</span>
            <span className="resume-job-period">La Jolla, CA</span>
          </div>
          <div className="resume-job-header">
            <span className="resume-job-company">B.S. Data Science &amp; B.A. Economics</span>
            <span className="resume-job-period">June 2028</span>
          </div>
          <ul className="resume-bullets">
            <li><strong>Relevant Coursework:</strong> Data Structures &amp; Algorithms, OOP, Data Science</li>
          </ul>
        </div>
      </section>

      <div className="resume-divider" />

      {/* Experience */}
      <section className="resume-section">
        <div className="resume-section-title">Experience</div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Co-Founder &amp; Founding Software Engineer &mdash; Aria AI</span>
            <span className="resume-job-period">June 2026 – Present</span>
          </div>
          <ul className="resume-bullets">
            <li>Co-founded a consumer wearable AI startup, driving a launch to <strong>25,000+ views in 24 hours</strong> and earning selection into Deepgram's startup program with <strong>1,000+</strong> sponsored API credits</li>
            <li>Shipped an early-access conversion funnel by architecting a token-driven Tailwind design system across 10+ statically-generated components at a sub-140 KB first-load budget</li>
            <li>Eliminated broken production deploys by configuring a GitHub Actions CI pipeline with lint, type-check, and smoke tests</li>
          </ul>
        </div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Founding Software Engineer &mdash; Netra</span>
            <span className="resume-job-period">May 2026 – Present</span>
          </div>
          <ul className="resume-bullets">
            <li>Deployed the company website for a <strong>$100k-funded</strong> startup via Nginx, Cloudflare, and GitHub Actions for automated testing</li>
            <li>Designed the company's visual identity including the logo, website, investor-facing pitch decks, and marketing materials</li>
          </ul>
        </div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Full-Stack Developer Intern &mdash; SEO USA</span>
            <span className="resume-job-period">May 2026 – Present</span>
          </div>
          <ul className="resume-bullets">
            <li>Built a containerized RESTful API with Python, FastAPI, and Docker with Supabase and Firebase for authentication and access control</li>
            <li>Improved PostgreSQL query performance by <strong>15%</strong> via execution plan analysis and indexing on high-cardinality fields</li>
            <li>Delivered full-stack features across a React frontend and Python backend in agile sprint cycles with CI/CD via GitHub Actions</li>
          </ul>
        </div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Software Engineer Lead &mdash; AISC @ UC San Diego</span>
            <span className="resume-job-period">Apr 2026 – Jul 2026</span>
          </div>
          <ul className="resume-bullets">
            <li>Built a production platform serving <strong>350+ members</strong> with Next.js, React, and Tailwind CSS, achieving <strong>20%</strong> load time reduction via ISR caching</li>
            <li>Improved data retrieval by <strong>60%</strong> migrating events from static JSON to Supabase PostgreSQL with schema design and RLS</li>
          </ul>
        </div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Undergraduate Researcher, ML/AI &mdash; Economics Research Lab @ UC San Diego</span>
            <span className="resume-job-period">Mar 2026 – Jun 2026</span>
          </div>
          <ul className="resume-bullets">
            <li>Trained a Random Forest classifier to <strong>0.982 ROC-AUC</strong> and 0.92 F1 on informal settlement detection from <strong>2,000+</strong> satellite images using QGIS, Python, and GeoPandas</li>
          </ul>
        </div>
      </section>

      <div className="resume-divider" />

      {/* Projects */}
      <section className="resume-section">
        <div className="resume-section-title">Projects</div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Aside AI &mdash; <em>1st Place, Deepgram Track · Berkeley AI Hackathon</em></span>
            <span className="resume-job-period">
              <a href="https://github.com/Da0t/AsideAI" target="_blank" rel="noreferrer">github.com/Da0t/AsideAI</a>
            </span>
          </div>
          <ul className="resume-bullets">
            <li>Engineered a real-time AI wearable narrating a room in 1&ndash;2 seconds via a Raspberry Pi camera, Python backend, and React Native app</li>
            <li>Built a Redis memory layer so AI personalities track narration history and build context across a session</li>
          </ul>
        </div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Pylon &mdash; <em>2nd Place, Bow Capital Hackathon</em></span>
            <span className="resume-job-period">
              <a href="https://lattice-pm4d.vercel.app/" target="_blank" rel="noreferrer">lattice-pm4d.vercel.app</a>
            </span>
          </div>
          <ul className="resume-bullets">
            <li>Built a terrain-aware simulation engine with BFS pathfinding, visualized through a real-time 3D tactical dashboard with 10+ custom deck.gl layers over Mapbox terrain</li>
            <li>Implemented a leaderless UDP gossip mesh with NAT traversal and LRU deduplication, converging topology in under 2 seconds</li>
          </ul>
        </div>
      </section>

      <div className="resume-divider" />

      {/* Skills */}
      <section className="resume-section">
        <div className="resume-section-title">Technical Skills</div>
        <div className="resume-job">
          <p><strong>Languages:</strong> Python, JavaScript/TypeScript, SQL, Java, Bash, R, HTML/CSS</p>
          <p><strong>Frameworks &amp; Libraries:</strong> React, Next.js, FastAPI, Tailwind CSS, Expo/React Native, PyTorch, Scikit-Learn, Pandas, SciPy, Matplotlib, Seaborn, statsmodels, Streamlit, deck.gl, Springboot</p>
          <p><strong>Databases:</strong> PostgreSQL, SQLite, MySQL, Supabase, Firebase</p>
          <p><strong>Tools &amp; Platforms:</strong> AWS (EC2, RDS, S3), Git/GitHub, Docker, Kubernetes, GitHub Actions, Databricks, Anaconda, Cloudflare, Nginx, Mapbox, QGIS, Claude Code, Codex, Redis</p>
        </div>
      </section>

      <div className="resume-actions">
        <a href="/Dat_resume.pdf" download className="btn95 default-btn">Save As... (PDF)</a>
        <a href="/Dat_resume.pdf" target="_blank" rel="noreferrer" className="btn95">Open</a>
      </div>
    </div>
  )
}
