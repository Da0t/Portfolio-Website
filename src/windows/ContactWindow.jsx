import { useState } from 'react'
import { PROFILE } from '../data/portfolioData'
import './ContactWindow.css'

export default function ContactWindow() {
  const [form, setForm] = useState({ to: PROFILE.email, from: '', subject: 'Hey Dat — let\'s work together', body: '' })
  const [draftOpened, setDraftOpened] = useState(false)

  function handleSend(e) {
    e.preventDefault()
    if (!form.from || !form.body) return
    const mailto = `mailto:${form.to}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.from}\n\n${form.body}`)}`
    window.open(mailto, '_blank')
    setDraftOpened(true)
  }

  if (draftOpened) {
    return (
      <div className="contact-window">
        <div className="contact-sent">
          <img src="/icons/inbox.svg" alt="" style={{ width: 48, height: 48, imageRendering: 'pixelated' }} />
          <div>
            <strong>Email draft opened</strong>
            <p>Your browser asked your email app to open this draft. It is not sent until you send it there.</p>
          </div>
          <button className="btn95 default-btn" onClick={() => setDraftOpened(false)}>Edit Draft</button>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-window">
      {/* Compose toolbar */}
      <div className="compose-toolbar raised">
        <button className="btn95 compose-send-btn" onClick={handleSend}>
          <img src="/icons/send.svg" alt="" className="compose-btn-icon" />
          Send
        </button>
        <div className="toolbar-sep" />
        <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn95 compose-btn-sm">GitHub</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn95 compose-btn-sm">LinkedIn</a>
      </div>

      {/* Form fields */}
      <form className="compose-form" onSubmit={handleSend}>
        <div className="compose-field-row">
          <label className="compose-label" htmlFor="contact-to">To:</label>
          <input id="contact-to" className="input95 compose-input" value={form.to} readOnly />
        </div>
        <div className="compose-divider" />
        <div className="compose-field-row">
          <label className="compose-label" htmlFor="contact-from">From:</label>
          <input
            id="contact-from"
            type="email"
            required
            className="input95 compose-input"
            placeholder="your@email.com"
            value={form.from}
            onChange={e => setForm(f => ({ ...f, from: e.target.value }))}
          />
        </div>
        <div className="compose-divider" />
        <div className="compose-field-row">
          <label className="compose-label" htmlFor="contact-subject">Subject:</label>
          <input
            id="contact-subject"
            required
            className="input95 compose-input"
            placeholder="Let's work together"
            value={form.subject}
            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          />
        </div>
        <div className="compose-divider" />
        <textarea
          aria-label="Message"
          required
          className="textarea95 compose-body"
          placeholder="Hi Dat, I'd love to chat about..."
          value={form.body}
          onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
        />
      </form>
    </div>
  )
}
