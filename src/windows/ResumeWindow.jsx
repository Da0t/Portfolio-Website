import './ResumeWindow.css'

export default function ResumeWindow() {
  return (
    <div className="resume-window">
      <div className="resume-header">
        <div className="resume-name">Dat Nguyen</div>
        <div className="resume-contact-line">
          (408) 856-8287 &nbsp;·&nbsp; datq.nguyen06@gmail.com &nbsp;·&nbsp;
          <a href="https://www.linkedin.com/in/dat-nguyen-b1b554297/" target="_blank" rel="noreferrer">linkedin.com/in/dat-nguyen</a>
          &nbsp;·&nbsp;
          <a href="https://github.com/Da0t" target="_blank" rel="noreferrer">github.com/Da0t</a>
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
            <span className="resume-job-company">B.S. in Data Science and B.A. in Economics &mdash; Junior Standing</span>
            <span className="resume-job-period">Expected June 2028</span>
          </div>
          <ul className="resume-bullets">
            <li><strong>Relevant Coursework:</strong> Data Structures &amp; Algorithms, OOP, Principles of Data Science, Programming for Data Science, Linear Algebra</li>
          </ul>
        </div>
      </section>

      <div className="resume-divider" />

      {/* Experience */}
      <section className="resume-section">
        <div className="resume-section-title">Experience</div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Data Analytics Intern &mdash; Commonpoint Queens</span>
            <span className="resume-job-period">Fall 2026</span>
          </div>
        </div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Tech Developer Intern &mdash; SEO (Sponsors for Educational Opportunity)</span>
            <span className="resume-job-period">May 2026 – Present</span>
          </div>
          <ul className="resume-bullets">
            <li>Selected for competitive full-stack engineering program with 35–40 hrs/week of synchronous SWE training, 1:1 engineering manager coaching, and partner company placement</li>
          </ul>
        </div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Software Engineer &mdash; AISC @ UCSD</span>
            <span className="resume-job-period">Apr 2026 – Present</span>
          </div>
          <ul className="resume-bullets">
            <li>Develop and maintain the AISC website serving <strong>250+ members</strong> using Next.js, React, and CSS on Netlify; reduced load times by <strong>20%</strong> via ISR caching</li>
            <li>Built a password-protected admin portal using Supabase Auth to improve content accessibility for non-technical leads</li>
          </ul>
        </div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Undergraduate Researcher &mdash; Economics Research Lab @ UCSD</span>
            <span className="resume-job-period">Mar 2026 – Jun 2026</span>
          </div>
          <ul className="resume-bullets">
            <li>Curated and preprocessed <strong>2,000+</strong> satellite images for Indonesia using QGIS, Python, and GeoPandas; integrated road networks, population density, and admin boundaries to train settlement classification models</li>
            <li>Trained a Random Forest classifier achieving <strong>0.982 ROC-AUC</strong>, 0.92 F1, 96.6% recall, and 87.8% precision using Scikit-Learn across 239 balanced test samples</li>
          </ul>
        </div>
      </section>

      <div className="resume-divider" />

      {/* Leadership */}
      <section className="resume-section">
        <div className="resume-section-title">Leadership &amp; Volunteering</div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">VP Project Operations &mdash; DataWorks @ UCSD</span>
            <span className="resume-job-period">Mar 2026 – Present</span>
          </div>
          <ul className="resume-bullets">
            <li>Lead a 10-person consulting team building a receipt scanning app with LLM-powered extraction and analytics</li>
            <li>Architecting pipeline from camera capture to Supabase storage to client-facing Next.js dashboard</li>
          </ul>
        </div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Campaign Lead &mdash; CALPIRG Students, UC San Diego Chapter</span>
            <span className="resume-job-period">Dec 2024 – Jan 2026</span>
          </div>
          <ul className="resume-bullets">
            <li>Logged <strong>200+</strong> volunteer hours; trained 6 volunteers on outreach and data collection; built Excel dashboards and pivot tables to present campaign metrics</li>
          </ul>
        </div>
      </section>

      <div className="resume-divider" />

      {/* Projects */}
      <section className="resume-section">
        <div className="resume-section-title">Projects</div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Rewind. &mdash; <em>1st place SDx Hackathon</em></span>
            <span className="resume-job-period">Python, Next.js, React, TypeScript, Tailwind, Omnara API</span>
          </div>
          <ul className="resume-bullets">
            <li>Engineered a fork pipeline that paginates full message history, truncates at the user's chosen point, remaps schemas for Omnara's import endpoint, and launches a fresh agent</li>
            <li>Built a TypeScript live-update system polling every 5s with incremental cursors and deduplication, auto-terminating on agent completion</li>
            <li>Shipped a typed Omnara API client for 6 endpoints with a regex-based decision detector surfacing fork points without LLM calls</li>
          </ul>
        </div>

        <div className="resume-job">
          <div className="resume-job-header">
            <span className="resume-job-role">Atlas.</span>
            <span className="resume-job-period">Next.js, React, TypeScript, FastAPI, Python, SQLite, TwelveLabs, Claude API</span>
          </div>
          <ul className="resume-bullets">
            <li>Built a multimodal RAG pipeline using TwelveLabs and Claude Sonnet 4.6, retrieving timestamped clips across visual/audio/transcript modalities and post-filtering ~90% cross-video noise</li>
            <li>Pre-generated all 4 study content types via parallel background jobs during video indexing; cached to SQLite, eliminating Claude API latency on first user load</li>
            <li>Shipped a study suite with auto-generated notes, Quizlet flashcards, and PDF-downloadable practice problems</li>
          </ul>
        </div>
      </section>

      <div className="resume-divider" />

      {/* Skills */}
      <section className="resume-section">
        <div className="resume-section-title">Technical Skills</div>
        <div className="resume-job">
          <p><strong>Languages:</strong> Python, SQL, Java, R, Stata, JavaScript/TypeScript, HTML/CSS</p>
          <p><strong>Libraries &amp; Frameworks:</strong> Pandas, Seaborn, Matplotlib, Scikit-Learn, statsmodels, SciPy, PyTorch, React, Next.js, Tailwind CSS, FastAPI, Streamlit, QGIS, SQLite</p>
          <p><strong>Tools &amp; Platforms:</strong> Git/Github, Databricks, Anaconda, Mamba, Supabase, Vercel, Netlify, TwelveLabs</p>
        </div>
      </section>

      <div className="resume-actions">
        <a href="/Dat_resume.pdf" download className="btn95 default-btn">Save As... (PDF)</a>
        <a href="/Dat_resume.pdf" target="_blank" rel="noreferrer" className="btn95">Open</a>
      </div>
    </div>
  )
}
