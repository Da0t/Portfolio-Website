(() => {
  'use strict';

  // Custom cursor
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let cursorX = 0, cursorY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    dot.style.left = cursorX + 'px';
    dot.style.top = cursorY + 'px';
  });

  (function animateCursor() {
    ringX += (cursorX - ringX) * 0.15;
    ringY += (cursorY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Theme toggle (synced with main page via localStorage)
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('.about-glance-number');
  const counterObserver = new IntersectionObserver(entries => {
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
  counters.forEach(el => counterObserver.observe(el));

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

  // Resume zoom modal — iframe only exists while modal is open
  const resumePreview = document.getElementById('resumePreview');
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalClose = document.getElementById('resumeModalClose');
  const resumeModalBody = document.getElementById('resumeModalBody');
  const resumeSrc = 'https://drive.google.com/file/d/1xPLCEe8skIZh6pqPxBAWRof2Kmw83yeT/preview';

  function openResume() {
    if (!resumeModal) return;
    resumeModalBody.innerHTML = `<iframe src="${resumeSrc}" width="100%" height="100%" frameborder="0" allow="autoplay" style="border:none;display:block;width:100%;height:100%;"></iframe>`;
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
  }

  function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    resumeModalBody.innerHTML = '';
  }

  if (resumePreview && resumeModal) {
    resumePreview.addEventListener('click', openResume);
    resumeModalClose.addEventListener('click', closeResume);
    resumeModal.addEventListener('click', e => { if (e.target === resumeModal) closeResume(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && resumeModal.classList.contains('open')) closeResume(); });
  }

  document.querySelectorAll('.about-section, .about-sidebar-card').forEach(card => {
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
})();
