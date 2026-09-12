const appEl = document.getElementById('app');
const header = document.getElementById('siteHeader');
const menuBtn = document.getElementById('menuBtn');
const views = document.querySelectorAll('.view');
const menuLinks = document.querySelectorAll('.menu-link');

function showView(name) {
  views.forEach(v => v.classList.toggle('is-active', v.dataset.view === name));
  menuLinks.forEach(l => l.classList.toggle('is-current', l.dataset.nav === name));
  document.documentElement.classList.toggle('view-open', name !== 'home');
  if (name !== 'home') window.scrollTo(0, 0);
  appEl.classList.remove('menu-open');
  menuBtn.setAttribute('aria-expanded', 'false');
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showView(el.dataset.nav);
  });
});

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
