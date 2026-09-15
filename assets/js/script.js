// --- Cambio de tema claro / oscuro ---
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function setPressedState(theme) {
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  setPressedState(root.getAttribute('data-theme') || 'light');

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    setPressedState(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// --- Snap suave entre secciones ---
// En vez de dejar que el navegador salte de golpe (CSS scroll-snap),
// controlamos el snap a mano: solo se pasa a la siguiente sección
// cuando el usuario ha scrolleado más de un 50% de la altura de la
// sección actual, y la transición se anima lenta y suavemente.
(function () {
  const snapSections = Array.from(document.querySelectorAll('section'));
  if (!snapSections.length) return;

  const THRESHOLD_RATIO = 0.5; // % de la sección que hay que scrollear para avanzar
  const DURATION = 1000;       // ms — cuanto más alto, más lenta la transición
  const IDLE_DELAY = 300;      // ms sin scroll antes de decidir a dónde encajar

  let idleTimer = null;
  let animating = false;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateScrollTo(targetY) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 1) return;

    animating = true;
    const startTime = performance.now();

    function step(now) {
      const t = Math.min((now - startTime) / DURATION, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(t));
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        animating = false;
      }
    }
    requestAnimationFrame(step);
  }

  function findCurrentIndex(scrollY) {
    let idx = 0;
    for (let i = 0; i < snapSections.length; i++) {
      if (snapSections[i].offsetTop <= scrollY + 2) idx = i;
    }
    return idx;
  }

  function handleIdle() {
    const scrollY = window.scrollY;
    const last = snapSections[snapSections.length - 1];
    const lastBottom = last.offsetTop + last.offsetHeight;

    // Si ya estamos más allá de la última sección (ej. en el footer), no forzar nada
    if (scrollY >= lastBottom - 40) return;

    const idx = findCurrentIndex(scrollY);
    const nextIdx = Math.min(idx + 1, snapSections.length - 1);
    const currentTop = snapSections[idx].offsetTop;
    const nextTop = snapSections[nextIdx].offsetTop;
    const gap = nextTop - currentTop || window.innerHeight;
    const progress = scrollY - currentTop;

    const targetIdx = (idx < nextIdx && progress > gap * THRESHOLD_RATIO) ? nextIdx : idx;
    animateScrollTo(snapSections[targetIdx].offsetTop);
  }

  window.addEventListener('scroll', () => {
    if (animating) return;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(handleIdle, IDLE_DELAY);
  }, { passive: true });

  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) animateScrollTo(target.offsetTop);
    });
  });
})();

// --- Detalle de proyecto a pantalla completa ---
(function () {
  let openPanel = null;

  function openDetail(panel) {
    openPanel = panel;
    panel.scrollTop = 0;
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDetail() {
    if (!openPanel) return;
    openPanel.classList.remove('active');
    document.body.style.overflow = '';
    openPanel = null;
  }

  document.querySelectorAll('.project-card').forEach((card) => {
    const panel = document.getElementById('detail-' + card.dataset.project);
    if (!panel) return;

    card.addEventListener('click', () => openDetail(panel));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDetail(panel);
      }
    });
  });

  document.querySelectorAll('.detail-close').forEach((btn) => {
    btn.addEventListener('click', closeDetail);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetail();
  });
})();
