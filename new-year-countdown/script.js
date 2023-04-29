function countdown() {
  const now = new Date();

  const year = now.getFullYear();
  const yearEl = document.querySelector('p.year');
  yearEl.textContent = `${year}`;

  const newYear = new Date(`${year + 1}-01-01:00:00:00`);

  const offsets = [1000 * 60 * 60 * 24, 1000 * 60 * 60, 1000 * 60, 1000];

  // times = [days, hours, minutes, seconds]
  const { times } = offsets.reduce((acc, cur) => {
    acc.times.push(Math.floor(acc.difference / cur));
    acc.difference %= cur;
    return acc;
  }, { difference: newYear.getTime() - now.getTime(), times: [] });

  Array.from(document.querySelectorAll('div.time'))
    .forEach((el, i) => {
      el.querySelector('h1').textContent = times[i];
    });
}

function setUp() {
  const spinnerEl = document.querySelector('img');
  const countdownEl = document.querySelector('div.countdown');
  countdown();
  setInterval(() => countdown(), 500);

  setTimeout(() => {
    spinnerEl.classList.add('hidden');
    countdownEl.classList.remove('hidden');
  }, 700);
}

window.addEventListener('load', setUp);
