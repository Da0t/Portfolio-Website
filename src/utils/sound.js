let ctx = null

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Short Win95-style mechanical click
export function playClick() {
  try {
    const c = getCtx()
    const now = c.currentTime

    const osc  = c.createOscillator()
    const gain = c.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(3800, now)
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.022)

    gain.gain.setValueAtTime(0.07, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028)

    osc.connect(gain)
    gain.connect(c.destination)

    osc.start(now)
    osc.stop(now + 0.03)
  } catch (_) {}
}

// Slightly softer, rounder click for Win2000
export function playClickW2k() {
  try {
    const c = getCtx()
    const now = c.currentTime

    const osc  = c.createOscillator()
    const gain = c.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(2400, now)
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.035)

    gain.gain.setValueAtTime(0.09, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)

    osc.connect(gain)
    gain.connect(c.destination)

    osc.start(now)
    osc.stop(now + 0.045)
  } catch (_) {}
}
