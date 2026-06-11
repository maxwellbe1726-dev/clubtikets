const dates = [
  'sáb 13 jun',
  'sáb 20 jun',
  'sáb 27 jun',
  'sáb 4 jul',
  'sáb 11 jul',
  'sáb 18 jul',
  'sáb 25 jul',
  'sáb 1 ago',
  'sáb 8 ago',
  'sáb 15 ago',
  'sáb 22 ago',
  'sáb 29 ago',
  'sáb 5 sept',
  'sáb 12 sept',
  'sáb 19 sept',
  'sáb 26 sept',
  'sáb 3 oct'
];

const row = document.querySelector('.dates-row');
const arrowButtons = document.querySelectorAll('[data-scroll]');

row.innerHTML = dates.map(date => `
  <article class="date-card">
    <span class="day">${date}</span>
    <img class="info-icon" src="img/icon-info_biza.svg" alt="Información">
    <div class="time"><img src="img/clock-icon_biza.svg" alt="">23:30h</div>
    <strong>Desde 85€</strong>
    <a href="entradas.html">Ver entradas</a>
  </article>
`).join('');

arrowButtons.forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.dataset.scroll === 'left' ? -1 : 1;
    row.scrollBy({ left: direction * 380, behavior: 'smooth' });
  });
});
