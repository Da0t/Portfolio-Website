import { useState } from 'react'
import './WelcomeDialog.css'

const tips = [
  "Dat won 1st place at the SDx Hackathon 2026 with Rewind. — an AI fork-and-resume pipeline.",
  "Dat is a Junior at UC San Diego studying Data Science and Economics.",
  "Dat's multimodal RAG system (Atlas.) post-filters ~90% of cross-video noise from search results.",
  "Dat trained a satellite image classifier with 0.982 ROC-AUC on informal settlement detection.",
  "Dat reduced AISC's website load time by 20% using ISR caching on Netlify.",
  "Dat leads a 10-person consulting team at DataWorks @ UCSD.",
]

export default function WelcomeDialog({ onClose, onWhatsNew, onProjects }) {
  const [tipIndex, setTipIndex] = useState(0)

  function nextTip() {
    setTipIndex(i => (i + 1) % tips.length)
  }

  return (
    <div className="welcome-overlay">
      <div className="welcome-dialog raised">
        <div className="titlebar titlebar-active">
          <img src="/icons/welcome.svg" alt="" className="titlebar-icon" />
          <span className="titlebar-title">Welcome to Dat's Portfolio</span>
          <div className="titlebar-buttons">
            <button className="btn95 titlebar-btn" onClick={onClose} title="Close">
              <svg width="8" height="8" viewBox="0 0 8 8">
                <line x1="0" y1="0" x2="8" y2="8" stroke="black" strokeWidth="1.5" />
                <line x1="8" y1="0" x2="0" y2="8" stroke="black" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="welcome-body">
          <div className="welcome-left">
            <div className="welcome-heading">
              Welcome to <span className="welcome-windows">Dat</span>
              <span className="welcome-95">.exe</span>
            </div>

            <div className="welcome-content stipple">
              <div className="welcome-content-inner">
                <img src="/icons/warning.svg" alt="" className="welcome-bulb" />
                <div>
                  <div className="welcome-tip-title">Did you know...</div>
                  <p className="welcome-tip-text">{tips[tipIndex]}</p>
                  <button
                    className="btn95"
                    style={{ marginTop: 8, minWidth: 'unset', padding: '2px 8px', fontSize: 10 }}
                    onClick={nextTip}
                  >
                    Next Tip »
                  </button>
                </div>
              </div>

              <div className="welcome-monitor">
                <div className="monitor-outer raised">
                  <div className="monitor-screen">
                    <div className="monitor-screen-text">
                      <div>&gt; python</div>
                      <div>&gt; react</div>
                      <div>&gt; ucsd_</div>
                    </div>
                  </div>
                  <div className="monitor-base" />
                </div>
              </div>
            </div>
          </div>

          <div className="welcome-buttons">
            <button className="btn95 default-btn" onClick={onWhatsNew}>
              About Me
            </button>
            <button className="btn95" onClick={onProjects}>
              View Projects
            </button>
            <button className="btn95" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
