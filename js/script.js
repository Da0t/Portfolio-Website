(() => {
  'use strict';

  // ============================================
  // PARTICLE NETWORK BACKGROUND
  // ============================================
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;
  let mousePos = { x: -1000, y: -1000 };

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.offsetWidth;
      this.y = Math.random() * canvas.offsetHeight;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
      this.baseRadius = this.radius;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.offsetWidth) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.offsetHeight) this.vy *= -1;

      const dx = mousePos.x - this.x;
      const dy = mousePos.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        this.radius = this.baseRadius + (1 - dist / 150) * 3;
      } else {
        this.radius += (this.baseRadius - this.radius) * 0.05;
      }
    }

    draw() {
      const style = getComputedStyle(document.documentElement);
      const color = style.getPropertyValue('--particle-color').trim();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(80, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000));
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawConnections() {
    const style = getComputedStyle(document.documentElement);
    const lineColor = style.getPropertyValue('--particle-line').trim();
    const maxDist = 140;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = (1 - dist / maxDist) * 1.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animFrame = requestAnimationFrame(animateParticles);
  }

  function startParticles() {
    resizeCanvas();
    initParticles();
    animateParticles();
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrame);
    startParticles();
  });

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mousePos = { x: -1000, y: -1000 };
  });

  startParticles();

  // ============================================
  // TYPING ANIMATION
  // ============================================
  const phrases = [
    'I explore data.',
    'I build dashboards.',
    'I find insights.',
    'I love statistics.',
    'I visualize trends.',
    'I love machine learning.',
    '"This is ML" — Pratham',
  ];
  const typingEl = document.getElementById('typingText');
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function typeLoop() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      typingEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 2000);
        return;
      }
      setTimeout(typeLoop, 70 + Math.random() * 40);
    } else {
      typingEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 35);
    }
  }

  setTimeout(typeLoop, 1200);

  // ============================================
  // CUSTOM CURSOR
  // ============================================
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let cursorX = 0, cursorY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    dot.style.left = cursorX + 'px';
    dot.style.top = cursorY + 'px';
  });

  function animateCursor() {
    ringX += (cursorX - ringX) * 0.15;
    ringY += (cursorY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll('a, button, .skill-tag, .project-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // ============================================
  // SCROLL REVEAL
  // ============================================
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = Math.ceil(target / 30);
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(interval);
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ============================================
  // NAVIGATION
  // ============================================
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 100) {
      nav.classList.toggle('hidden', current > lastScroll && current > 300);
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = current;
  }, { passive: true });

  // Active link highlight
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // ============================================
  // THEME TOGGLE
  // ============================================
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ============================================
  // PROJECT CARD GLOW FOLLOW
  // ============================================
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
  });

  // ============================================
  // PROJECT CARD TILT
  // ============================================
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ============================================
  // SMOOTH ANCHOR SCROLL (fallback for Safari)
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // ORNAMENTAL CORNER BORDERS
  // ============================================
  const cornerSVG = `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 42 L2 7 Q2 2 7 2 L42 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M2 18 Q7 12 14 9" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" opacity="0.7"/>
    <path d="M18 2 Q12 7 9 14" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" opacity="0.7"/>
    <path d="M9 14 Q11 11 14 9" stroke="currentColor" stroke-width="0.7" stroke-linecap="round" opacity="0.5"/>
    <circle cx="5" cy="5" r="2.5" stroke="currentColor" stroke-width="0.8" opacity="0.8"/>
    <circle cx="5" cy="5" r="0.8" fill="currentColor" opacity="0.9"/>
    <path d="M7 2 Q7 5 9.5 5 Q7 5 7 7.5" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" opacity="0.45"/>
  </svg>`;

  document.querySelectorAll('.project-card, .timeline-content, .skill-category').forEach(card => {
    const wrapper = document.createElement('div');
    wrapper.className = 'corner-ornaments';
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.innerHTML =
      `<div class="corner-tl">${cornerSVG}</div>` +
      `<div class="corner-tr">${cornerSVG}</div>` +
      `<div class="corner-br">${cornerSVG}</div>` +
      `<div class="corner-bl">${cornerSVG}</div>`;
    card.appendChild(wrapper);
  });

  // ============================================
  // GRID CENTER → PAST PROJECTS MODAL
  // ============================================
  const pastModal = document.getElementById('pastProjectsModal');
  const pastOpen = document.getElementById('pastProjectsOpen');
  const pastOpenMobile = document.getElementById('pastProjectsOpenMobile');
  const pastClose = document.getElementById('pastProjectsClose');

  function openPastModal() {
    if (!pastModal) return;
    pastModal.classList.add('open');
    pastModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('past-modal-open');
  }

  function closePastModal() {
    if (!pastModal) return;
    pastModal.classList.remove('open');
    pastModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.body.classList.remove('past-modal-open');
  }

  if (pastModal) {
    if (pastOpen) pastOpen.addEventListener('click', e => { e.preventDefault(); openPastModal(); });
    if (pastOpenMobile) pastOpenMobile.addEventListener('click', e => { e.preventDefault(); openPastModal(); });
    if (pastClose) pastClose.addEventListener('click', closePastModal);
    pastModal.addEventListener('click', e => {
      if (e.target.classList.contains('past-projects-backdrop')) closePastModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && pastModal.classList.contains('open')) closePastModal();
    });
  }

  // ============================================
  // MINESWEEPER MINI-GAME
  // ============================================
  (function initMinesweeper() {
    const boardEl = document.getElementById('msBoard');
    if (!boardEl) return;

    const ROWS = 8, COLS = 8, MINES = 8;
    const flagsEl = document.getElementById('msFlags');
    const timeEl  = document.getElementById('msTime');
    const statEl  = document.getElementById('msStatus');
    const resetBtn = document.getElementById('msReset');

    let grid, minePositions, revealedCount, flagCount, dead, won, seconds, tick;

    function neighbours(r, c) {
      const n = [];
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue;
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) n.push([nr, nc]);
        }
      return n;
    }

    function newGame() {
      clearInterval(tick); tick = null;
      seconds = 0; timeEl.textContent = '0';
      revealedCount = 0; flagCount = 0; dead = false; won = false;
      flagsEl.textContent = String(MINES);
      statEl.textContent = 'Click any cell to start!';

      grid = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => ({ mine: false, adj: 0, open: false, flag: false }))
      );

      minePositions = new Set();
      while (minePositions.size < MINES)
        minePositions.add(Math.floor(Math.random() * ROWS * COLS));

      minePositions.forEach(i => {
        grid[Math.floor(i / COLS)][i % COLS].mine = true;
      });

      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++)
          if (!grid[r][c].mine)
            grid[r][c].adj = neighbours(r, c).filter(([nr, nc]) => grid[nr][nc].mine).length;

      render();
    }

    function render() {
      boardEl.innerHTML = '';
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = grid[r][c];
          const el = document.createElement('div');
          el.className = 'ms-cell';
          el.dataset.r = r;
          el.dataset.c = c;

          if (cell.open) {
            el.classList.add('ms-revealed');
            if (cell.mine) {
              el.classList.add('ms-mine');
              el.textContent = '💥';
            } else if (cell.adj > 0) {
              el.textContent = cell.adj;
              el.classList.add('ms-n' + Math.min(cell.adj, 5));
            }
          } else if (cell.flag) {
            el.classList.add('ms-flag');
            el.textContent = '🚩';
          }

          boardEl.appendChild(el);
        }
      }
    }

    function startClock() {
      if (tick) return;
      tick = setInterval(() => { seconds++; timeEl.textContent = seconds; }, 1000);
    }

    function flood(r, c) {
      const cell = grid[r][c];
      if (cell.open || cell.flag) return;
      cell.open = true;
      revealedCount++;
      if (cell.adj === 0)
        neighbours(r, c).forEach(([nr, nc]) => flood(nr, nc));
    }

    function checkWin() {
      if (revealedCount === ROWS * COLS - MINES) {
        won = true;
        clearInterval(tick);
        statEl.textContent = '🎉 You won in ' + seconds + 's!';
      }
    }

    function revealMines() {
      minePositions.forEach(i => {
        grid[Math.floor(i / COLS)][i % COLS].open = true;
      });
    }

    boardEl.addEventListener('click', e => {
      const t = e.target.closest('.ms-cell');
      if (!t || dead || won) return;
      const r = +t.dataset.r, c = +t.dataset.c;
      const cell = grid[r][c];
      if (cell.open || cell.flag) return;

      startClock();

      if (cell.mine) {
        dead = true;
        clearInterval(tick);
        revealMines();
        statEl.textContent = '💣 Game over! Try again.';
        render();
        return;
      }

      flood(r, c);
      checkWin();
      render();
    });

    boardEl.addEventListener('contextmenu', e => {
      e.preventDefault();
      const t = e.target.closest('.ms-cell');
      if (!t || dead || won) return;
      const r = +t.dataset.r, c = +t.dataset.c;
      const cell = grid[r][c];
      if (cell.open) return;
      cell.flag = !cell.flag;
      flagCount += cell.flag ? 1 : -1;
      flagsEl.textContent = String(Math.max(0, MINES - flagCount));
      render();
    });

    resetBtn.addEventListener('click', newGame);
    newGame();
  })();

  // ============================================
  // EXPANDABLE CARDS (projects + timeline)
  // ============================================
  let cardAudioCtx = null;

  function playPageTurn() {
    if (!cardAudioCtx) cardAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = cardAudioCtx;
    const now = ctx.currentTime;
    const dur = 0.2;
    const vol = 0.018;

    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      const env = t < 0.05 ? t / 0.05
                : t < 0.15 ? 1.0
                : t < 0.6  ? 1.0 - (t - 0.15) / 0.45 * 0.7
                : (1.0 - t) / 0.4 * 0.3;
      const snap = (t > 0.7 && t < 0.78) ? 2.5 : 1;
      d[i] = (Math.random() * 2 - 1) * env * snap;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(800, now);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(4000, now);
    lp.frequency.linearRampToValueAtTime(6000, now + 0.08);
    lp.frequency.linearRampToValueAtTime(3000, now + dur);

    const peak = ctx.createBiquadFilter();
    peak.type = 'peaking';
    peak.frequency.setValueAtTime(2500, now);
    peak.gain.setValueAtTime(4, now);
    peak.Q.setValueAtTime(1.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, now);

    src.connect(hp).connect(lp).connect(peak).connect(gain).connect(ctx.destination);
    src.start(now);
    src.stop(now + dur);
  }

  const allExpandable = document.querySelectorAll('.project-card, .timeline-content');
  const gridCenterOrn = document.querySelector('.grid-center-btn');

  allExpandable.forEach(card => {
    const toggle = card.querySelector('.expand-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const opening = !card.classList.contains('expanded');
      card.classList.toggle('expanded');

      if (gridCenterOrn) {
        const anyOpen = document.querySelector('.project-card.expanded');
        gridCenterOrn.style.opacity = anyOpen ? '0' : '';
        gridCenterOrn.style.pointerEvents = anyOpen ? 'none' : '';
      }

      playPageTurn();

      if (opening) {
        const projectCards = Array.from(document.querySelectorAll('.project-card'));
        const isBottomRow = projectCards.indexOf(card) >= projectCards.length - 2;
        if (!isBottomRow) {
          setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 100);
        }
      }
    });
  });

  // ============================================
  // AMBIENT SCATTERED DOTS
  // ============================================
  const dotSections = document.querySelectorAll(
    '#experience, #projects, #skills, #contact'
  );

  function getExclusionZones(section) {
    const sRect = section.getBoundingClientRect();
    const selectors = '.project-card, .timeline-content, .timeline-marker, .timeline-curve, .skill-category, .section-title, .projects-grid .grid-center-btn, .timeline-endpoint, .contact-container, .btn';
    const zones = [];
    const pad = 20;
    section.querySelectorAll(selectors).forEach(el => {
      const r = el.getBoundingClientRect();
      zones.push({
        top: r.top - sRect.top - pad,
        left: r.left - sRect.left - pad,
        bottom: r.bottom - sRect.top + pad,
        right: r.right - sRect.left + pad
      });
    });
    return zones;
  }

  function hitsZone(x, y, zones) {
    return zones.some(z => x >= z.left && x <= z.right && y >= z.top && y <= z.bottom);
  }

  dotSections.forEach(section => {
    section.style.position = 'relative';
    section.style.overflow = 'hidden';
    const sW = section.offsetWidth;
    const sH = section.offsetHeight;
    const zones = getExclusionZones(section);

    const total = Math.round((6 + Math.floor(Math.random() * 3)) * 1.2);
    let placed = 0;
    let attempts = 0;

    while (placed < total && attempts < 200) {
      attempts++;
      const x = 10 + Math.random() * (sW - 20);
      const y = 10 + Math.random() * (sH - 20);
      if (hitsZone(x, y, zones)) continue;

      const isMd = placed < 2;
      const isRare = !isMd && Math.random() < 0.04 && section.querySelectorAll('.ambient-dot--rare').length < 2;
      const dot = document.createElement('div');
      dot.className = 'ambient-dot ' + (isRare ? 'ambient-dot--rare' : isMd ? 'ambient-dot--md' : 'ambient-dot--sm');
      if (isRare) dot.dataset.value = '5';
      dot.setAttribute('aria-hidden', 'true');
      dot.style.top = y + 'px';
      dot.style.left = x + 'px';
      dot.style.setProperty('--dur', (3 + Math.random() * 4).toFixed(1) + 's');
      dot.style.setProperty('--lo', (0.15 + Math.random() * 0.15).toFixed(2));
      dot.style.setProperty('--hi', (isRare ? 0.5 : isMd ? 0.4 : 0.3) + (Math.random() * 0.2).toFixed(2));
      dot.style.animationDelay = -(Math.random() * 8).toFixed(1) + 's';
      section.appendChild(dot);
      placed++;
    }
  });

  // ============================================
  // ENDPOINT MINI-GAME: CLICK TO ACTIVATE
  // ============================================
  const endpoint = document.querySelector('.timeline-endpoint');
  if (endpoint) {
    const PULL_RADIUS = 160;
    const ABSORB_RADIUS = 28;
    const GAME_DURATION = 10;
    const HS_KEY = 'dotGameHighScore';
    let isActive = false;
    let score = 0;
    let highScore = parseInt(localStorage.getItem(HS_KEY)) || 0;
    let mouseX = 0, mouseY = 0;
    let gameLoop = null;
    let timerInterval = null;
    let orb = null;

    let audioCtx = null;
    function playAbsorbSound() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600 + Math.random() * 400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    }

    function playRareSound() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.06, 0.12].forEach((delay, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime([880, 1100, 1320][i], audioCtx.currentTime + delay);
        gain.gain.setValueAtTime(0.07, audioCtx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + 0.18);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + 0.18);
      });
    }

    function playEndSound() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.1, 0.2].forEach((delay, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime([523, 659, 784][i], audioCtx.currentTime + delay);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + 0.3);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + 0.3);
      });
    }

    function safeRespawn(dot) {
      const p = dot.parentElement;
      if (!p) return;
      const zones = getExclusionZones(p);
      const w = p.offsetWidth;
      const h = p.offsetHeight;
      let tries = 0;
      while (tries < 60) {
        const nx = 10 + Math.random() * (w - 20);
        const ny = 10 + Math.random() * (h - 20);
        if (!hitsZone(nx, ny, zones)) {
          dot.style.left = nx + 'px';
          dot.style.top = ny + 'px';
          return;
        }
        tries++;
      }
      dot.style.left = (10 + Math.random() * (w - 20)) + 'px';
      dot.style.top = (10 + Math.random() * (h - 20)) + 'px';
    }

    function createOrb() {
      orb = document.createElement('div');
      orb.className = 'game-orb';
      const hsText = highScore > 0 ? `<div class="game-orb-high">Best: ${highScore}</div>` : '';
      orb.innerHTML = `
        <div class="game-orb-core"></div>
        <div class="game-orb-ring"></div>
        <div class="game-orb-ring game-orb-ring-2"></div>
        <div class="game-orb-score">0</div>
        <div class="game-orb-timer">${GAME_DURATION}</div>
        ${hsText}
      `;
      document.body.appendChild(orb);
    }

    function updateOrbPos() {
      if (!orb) return;
      orb.style.left = mouseX + 'px';
      orb.style.top = mouseY + 'px';
    }

    function startGame() {
      if (isActive) return;
      isActive = true;
      score = 0;

      createOrb();
      updateOrbPos();
      endpoint.style.visibility = 'hidden';

      let timeLeft = GAME_DURATION;
      const timerEl = orb.querySelector('.game-orb-timer');
      const scoreEl = orb.querySelector('.game-orb-score');

      timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 3) timerEl.style.color = '#ef4444';
        if (timeLeft <= 0) endGame();
      }, 1000);

      gameLoop = setInterval(() => {
        updateOrbPos();

        const cx = mouseX;
        const cy = mouseY;
        const allDots = document.querySelectorAll('.ambient-dot:not(.absorbed)');

        allDots.forEach(dot => {
          const dr = dot.getBoundingClientRect();
          const dotX = dr.left + dr.width / 2;
          const dotY = dr.top + dr.height / 2;
          const dx = cx - dotX;
          const dy = cy - dotY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < ABSORB_RADIUS) {
            dot.classList.add('absorbed');
            const pts = dot.dataset.value ? parseInt(dot.dataset.value) : 1;
            score += pts;
            scoreEl.textContent = score;
            if (pts > 1) playRareSound(); else playAbsorbSound();
            const wasRare = dot.classList.contains('ambient-dot--rare');
            setTimeout(() => {
              dot.classList.remove('absorbed', 'attracted');
              dot.style.opacity = '';
              dot.style.transform = '';
              if (wasRare) {
                dot.className = 'ambient-dot ambient-dot--sm';
                delete dot.dataset.value;
              }
              safeRespawn(dot);
              if (document.querySelectorAll('.ambient-dot--rare').length < 2 && Math.random() < 0.04) {
                dot.className = 'ambient-dot ambient-dot--rare';
                dot.dataset.value = '5';
              }
            }, 2000);

          } else if (dist < PULL_RADIUS) {
            dot.classList.add('attracted');
            const strength = 1 - (dist / PULL_RADIUS);
            const pRect = dot.parentElement.getBoundingClientRect();
            const curX = dr.left - pRect.left + dr.width / 2;
            const curY = dr.top - pRect.top + dr.height / 2;
            dot.style.left = (curX + dx * strength * 0.25) + 'px';
            dot.style.top = (curY + dy * strength * 0.25) + 'px';
            dot.style.opacity = (0.5 + strength * 0.5).toFixed(2);

          } else if (dot.classList.contains('attracted')) {
            dot.classList.remove('attracted');
            dot.style.opacity = '';
          }
        });
      }, 16);
    }

    function endGame() {
      isActive = false;
      clearInterval(gameLoop);
      clearInterval(timerInterval);
      playEndSound();

      const isNewHigh = score > highScore;
      if (isNewHigh) {
        highScore = score;
        try { localStorage.setItem(HS_KEY, highScore); } catch (_) {}
      }

      document.querySelectorAll('.ambient-dot.attracted').forEach(d => {
        d.classList.remove('attracted');
        d.style.opacity = '';
      });

      if (orb) {
        const newHighHtml = isNewHigh ? '<span class="game-result-new">New High Score!</span>' : '';
        orb.innerHTML = `<div class="game-orb-result">
          <span class="game-result-score">${score}</span>
          <span class="game-result-label">collected</span>
          ${newHighHtml}
          <span class="game-result-best">Best: ${highScore}</span>
        </div>`;
        orb.classList.add('game-orb-end');

        setTimeout(() => {
          if (orb && orb.parentElement) orb.parentElement.removeChild(orb);
          orb = null;
          endpoint.style.visibility = '';
        }, 3000);
      }
    }

    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
    window.addEventListener('touchmove', e => {
      const t = e.touches[0];
      mouseX = t.clientX;
      mouseY = t.clientY;
    }, { passive: true });

    endpoint.addEventListener('click', startGame);
    endpoint.addEventListener('touchend', e => {
      e.preventDefault();
      startGame();
    });
  }

})();
