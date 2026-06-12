const dates = [
  'Sat 13 Jun',
  'Sat 20 Jun',
  'Sat 27 Jun',
  'Sat 4 Jul',
  'Sat 11 Jul',
  'Sat 18 Jul',
  'Sat 25 Jul',
  'Sat 1 Aug',
  'Sat 8 Aug',
  'Sat 15 Aug',
  'Sat 22 Aug',
  'Sat 29 Aug',
  'Sat 5 Sept',
  'Sat 12 Sept',
  'Sat 19 Sept',
  'Sat 26 Sept',
  'Sat 3 Oct'
];

const row = document.querySelector('.dates-row');
const arrowButtons = document.querySelectorAll('[data-scroll]');

row.innerHTML = dates.map(date => `
  <article class="date-card">
    <span class="day">${date}</span>
    <img class="info-icon" src="img/icon-info_biza.svg" alt="Information">
    <div class="time"><img src="img/clock-icon_biza.svg" alt="">23:30h</div>
    <strong>From 85€</strong>
    <a href="entradas.html">See tickets</a>
  </article>
`).join('');

arrowButtons.forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.dataset.scroll === 'left' ? -1 : 1;
    row.scrollBy({ left: direction * 380, behavior: 'smooth' });
  });
});

/* ===== Menu overlay ===== */
const menuBtn = document.querySelector('.header-actions .menu');
const menuOverlay = document.getElementById('menuOverlay');
const menuCloseBtn = document.querySelector('.menu-close');

function openMenu() {
  menuOverlay.classList.add('is-open');
  menuOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  menuOverlay.classList.remove('is-open');
  menuOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}

if (menuBtn && menuOverlay) {
  menuBtn.addEventListener('click', openMenu);
}

if (menuCloseBtn && menuOverlay) {
  menuCloseBtn.addEventListener('click', closeMenu);
}

// Close with Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOverlay.classList.contains('is-open')) {
    closeMenu();
  }
});
