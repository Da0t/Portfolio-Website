// Synthesise an old mechanical mouse click using a noise burst + bandpass filter.
// A fresh AudioContext is created every time to avoid browser suspension issues.

function mechanicalClick(gainLevel = 0.55, filterFreq = 2800) {
  try {
    const ctx      = new AudioContext()
    const now      = ctx.currentTime
    const rate     = ctx.sampleRate

    // ── Noise burst (25 ms, sharp exponential decay) ──────────
    const len    = Math.ceil(rate * 0.025)
    const buffer = ctx.createBuffer(1, len, rate)
    const data   = buffer.getChannelData(0)
    for (let i = 0; i < len; i++) {
      const env = Math.exp(-i / len * 28)   // fast decay
      data[i]   = (Math.random() * 2 - 1) * env
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer

    // ── Bandpass: gives that mid-range "clicky" snap ──────────
    const bp   = ctx.createBiquadFilter()
    bp.type    = 'bandpass'
    bp.frequency.value = filterFreq
    bp.Q.value = 0.9

    // ── Short low-frequency thump (body of the click) ─────────
    const osc  = ctx.createOscillator()
    const oGain = ctx.createGain()
    osc.type   = 'sine'
    osc.frequency.setValueAtTime(180, now)
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.018)
    oGain.gain.setValueAtTime(gainLevel * 0.4, now)
    oGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02)
    osc.connect(oGain)
    oGain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.022)

    // ── Mix noise burst ───────────────────────────────────────
    const master = ctx.createGain()
    master.gain.value = gainLevel
    source.connect(bp)
    bp.connect(master)
    master.connect(ctx.destination)
    source.start(now)

    source.onended = () => ctx.close()
  } catch (_) {}
}

// Win95: sharper, higher-pitched (old PS/2 mouse)
export function playClick() {
  mechanicalClick(0.55, 3200)
}

// Win2000: slightly softer and deeper
export function playClickW2k() {
  mechanicalClick(0.5, 2400)
}
