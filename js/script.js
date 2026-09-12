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
