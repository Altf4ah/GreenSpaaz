const appEl = document.getElementById('app');
const header = document.getElementById('siteHeader');
const menuBtn = document.getElementById('menuBtn');
const views = document.querySelectorAll('.view');
const menuLinks = document.querySelectorAll('.menu-link');

// Real, bookmarkable paths for each view — helps sharing links and lets each
// page carry its own title. vercel.json rewrites every path to index.html,
// and this reads the current path back out on load so /about etc. work.
const VIEW_ROUTES = {
  home: { path: '/', title: 'GreenSpanzIndia | Architecture & Design Studio, Kochi Kerala' },
  about: { path: '/about', title: 'About | GreenSpanzIndia' },
  work: { path: '/work', title: 'Projects | GreenSpanzIndia' },
  contact: { path: '/contact', title: 'Contact | GreenSpanzIndia' }
};

function showView(name, { pushState = true } = {}) {
  const route = VIEW_ROUTES[name] || VIEW_ROUTES.home;

  views.forEach(v => v.classList.toggle('is-active', v.dataset.view === name));
  menuLinks.forEach(l => l.classList.toggle('is-current', l.dataset.nav === name));
  document.documentElement.classList.toggle('view-open', name !== 'home');
  if (name !== 'home') window.scrollTo(0, 0);
  appEl.classList.remove('menu-open');
  menuBtn.setAttribute('aria-expanded', 'false');

  document.title = route.title;
  if (pushState && window.location.pathname !== route.path) {
    history.pushState({ view: name }, '', route.path);
  }
}

function viewNameFromPath(path) {
  const match = Object.entries(VIEW_ROUTES).find(([, r]) => r.path === path);
  return match ? match[0] : 'home';
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showView(el.dataset.nav);
  });
});

window.addEventListener('popstate', () => {
  showView(viewNameFromPath(window.location.pathname), { pushState: false });
});

// Show the correct view on first load (e.g. someone opens /work directly)
showView(viewNameFromPath(window.location.pathname), { pushState: false });

menuBtn.addEventListener('click', () => {
  const isOpen = appEl.classList.toggle('menu-open');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

// ----- Hero carousel -----
const slides = document.querySelectorAll('.slide');
const dotsWrap = document.getElementById('heroDots');
let current = 0;
let timer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  if (i === 0) dot.classList.add('is-active');
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
});

const dots = dotsWrap.querySelectorAll('button');

function goTo(index) {
  slides[current].classList.remove('is-active');
  dots[current].classList.remove('is-active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('is-active');
  dots[current].classList.add('is-active');
  resetTimer();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(next, 5500);
}

document.getElementById('nextBtn').addEventListener('click', next);
document.getElementById('prevBtn').addEventListener('click', prev);

resetTimer();

// ----- Project filtering (desktop tabs + mobile overlay) -----
const projectCards = document.querySelectorAll('.project-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const filterLinks = document.querySelectorAll('.filter-link');

function applyFilter(value) {
  projectCards.forEach(card => {
    const match = value === 'all' || card.dataset.category === value;
    card.classList.toggle('is-hidden', !match);
  });
  filterBtns.forEach(b => b.classList.toggle('is-active', b.dataset.filter === value));
  filterLinks.forEach(l => l.classList.toggle('is-active', l.dataset.filter === value));
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
});

filterLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    applyFilter(link.dataset.filter);
    closeFilterOverlay();
  });
});

// ----- Small-window filter overlay -----
const filterToggle = document.getElementById('filterToggle');
const filterOverlay = document.getElementById('filterOverlay');
const filterOverlayClose = document.getElementById('filterOverlayClose');

function openFilterOverlay() { filterOverlay.classList.add('is-open'); }
function closeFilterOverlay() { filterOverlay.classList.remove('is-open'); }

if (filterToggle) filterToggle.addEventListener('click', openFilterOverlay);
if (filterOverlayClose) filterOverlayClose.addEventListener('click', closeFilterOverlay);

// ----- Project detail modal -----
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalClient = document.getElementById('modalClient');
const modalLocation = document.getElementById('modalLocation');
const modalDesc = document.getElementById('modalDesc');
const modalScroll = document.querySelector('.modal-scroll');

function openProjectModal(card) {
  modalImg.src = card.dataset.img;
  modalImg.alt = card.dataset.title;
  modalTitle.textContent = card.dataset.title;
  modalClient.textContent = card.dataset.client;
  modalLocation.textContent = card.dataset.location;
  modalDesc.textContent = card.dataset.desc;
  projectModal.classList.add('is-open');
  if (modalScroll) modalScroll.scrollTop = 0;
}

function closeProjectModal() { projectModal.classList.remove('is-open'); }

projectCards.forEach(card => {
  card.addEventListener('click', () => openProjectModal(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProjectModal(card);
    }
  });
});

modalClose.addEventListener('click', closeProjectModal);

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  closeProjectModal();
  closeFilterOverlay();
});

// ----- Request a quote form -----
// Builds a pre-filled email to the studio address — no backend needed.
// To switch to a real form backend later (so it doesn't rely on the visitor's
// own mail app), sign up at https://formspree.io, replace this handler with a
// fetch() POST to your form endpoint, and keep the honeypot field as-is.
const quoteForm = document.getElementById('quoteForm');
const quoteStatus = document.getElementById('quoteStatus');
const STUDIO_EMAIL = 'greenspanzindia@gmail.com';

if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Honeypot: real visitors never see or fill this field
    const honeypot = quoteForm.querySelector('#companySite').value.trim();
    if (honeypot !== '') {
      // Silently drop likely bot submissions without any error shown
      quoteForm.reset();
      return;
    }

    const name = quoteForm.qName.value.trim();
    const email = quoteForm.qEmail.value.trim();
    const phone = quoteForm.qPhone.value.trim();
    const type = quoteForm.qType.value;
    const message = quoteForm.qMessage.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      quoteStatus.textContent = 'Please fill in your name, email and a short message.';
      quoteStatus.classList.add('is-error');
      return;
    }

    if (!emailPattern.test(email)) {
      quoteStatus.textContent = 'That email address doesn\u2019t look right — please double-check it.';
      quoteStatus.classList.add('is-error');
      return;
    }

    const subject = `New project request from ${name}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Project type: ${type}`,
      '',
      message
    ].filter(Boolean);

    const mailtoUrl = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    quoteStatus.classList.remove('is-error');
    quoteStatus.textContent = 'Opening your email app to send this...';
    window.location.href = mailtoUrl;
  });
}
