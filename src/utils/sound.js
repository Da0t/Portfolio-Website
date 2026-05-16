let _ctx = null

function getCtx() {
  if (!_ctx || _ctx.state === 'closed') _ctx = new AudioContext()
  if (_ctx.state === 'suspended') _ctx.resume()
  return _ctx
}

// Punchy mechanical click: resonant bandpass snap + short thump.
function mechanicalClick(gainLevel = 0.4, snapFreq = 2200) {
  try {
    const ctx  = getCtx()
    const now  = ctx.currentTime
    const rate = ctx.sampleRate

    // Snap: 10ms noise burst through resonant bandpass
    const snapLen    = Math.ceil(rate * 0.010)
    const snapBuffer = ctx.createBuffer(1, snapLen, rate)
    const snapData   = snapBuffer.getChannelData(0)
    for (let i = 0; i < snapLen; i++) {
      snapData[i] = (Math.random() * 2 - 1) * Math.exp(-i / snapLen * 50)
    }

    const snapSrc  = ctx.createBufferSource()
    snapSrc.buffer = snapBuffer

    const bp        = ctx.createBiquadFilter()
    bp.type         = 'bandpass'
    bp.frequency.value = snapFreq
    bp.Q.value      = 3.0

    const snapGain      = ctx.createGain()
    snapGain.gain.value = gainLevel * 1.4

    snapSrc.connect(bp)
    bp.connect(snapGain)
    snapGain.connect(ctx.destination)
    snapSrc.start(now)

    // Thump: short sine sweep for body
    const osc   = ctx.createOscillator()
    const oGain = ctx.createGain()
    osc.type    = 'sine'
    osc.frequency.setValueAtTime(300, now)
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.012)
    oGain.gain.setValueAtTime(gainLevel * 0.35, now)
    oGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014)
    osc.connect(oGain)
    oGain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.016)
  } catch (_) {}
}

// Win95: older PS/2 mouse — sharper, higher snap
export function playClick() {
  mechanicalClick(0.4, 2200)
}

// Win2000: slightly newer mouse — softer, lower snap
export function playClickW2k() {
  mechanicalClick(0.35, 1800)
}

// Returns the right click function for the current theme.
// Add new themes here as they're introduced.
const THEME_SOUNDS = {
  win95:   playClick,
  win2000: playClickW2k,
}

export function getClickSound(theme) {
  return THEME_SOUNDS[theme] ?? playClick
}
