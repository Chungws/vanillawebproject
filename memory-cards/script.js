const showAddOverlayBtn = document.querySelector('header > button');
const addBtn = document.querySelector('.overlay > form.center > button#add');
const clearBtn = document.querySelector('button.clear');
const carousel = document.querySelector('.carousel');
const [leftBtn, rightBtn] = document.querySelectorAll('nav.pages > button');
const pageText = document.querySelector('nav.pages > p');

const getQnAs = () => JSON.parse(localStorage.getItem('qnas')) || [];

const createCard = ({ question, answer }) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
<div class="icon"><i class="fa-solid fa-arrows-rotate"></i>Flip</div>
<div class="card-inner">
  <div class="front"><p>${question}</p></div>
  <div class="back"><p>${answer}</p></div>
</div>`;
  card.addEventListener('click', (e) => {
    e.target.classList.toggle('flip');
  });
  return card;
};

const renderCards = () => {
  const qnas = getQnAs();
  qnas.forEach((qna) => {
    carousel.appendChild(createCard(qna));
  });
  carousel.children?.[0].classList.add('active');
};

const addCard = ({ question, answer }) => {
  const qnas = getQnAs();
  qnas.push({ question, answer });
  localStorage.setItem('qnas', JSON.stringify(qnas));
};

const clearCards = () => {
  Array.from(carousel.children).forEach((card) => { card.remove(); });
  localStorage.removeItem('qnas');
};

const renderPageText = () => {
  const cards = Array.from(carousel.children);
  const activeCardIdx = cards.findIndex((card) => card.classList.contains('active'));
  pageText.textContent = `${activeCardIdx + 1}/${cards.length}`;
};

window.addEventListener('load', () => {
  renderCards();
});

window.addEventListener('storage', renderCards);

showAddOverlayBtn.addEventListener('click', () => {
  document.querySelector('.overlay').classList.toggle('hidden');
});

addBtn.addEventListener('click', () => {
  const [question, answer] = Array.from(document.querySelectorAll('.overlay > form.center > textarea'))
    .map((textarea) => textarea.value);
  addCard({ question, answer });
});

clearBtn.addEventListener('click', clearCards);

rightBtn.addEventListener('click', () => {
  const cards = Array.from(carousel.children);
  const activeCardIdx = cards.findIndex((card) => card.classList.contains('active'));
  if (activeCardIdx === cards.length - 1) {
    return;
  }
  const currCard = cards[activeCardIdx];
  const nextCard = cards[activeCardIdx + 1];

  currCard.classList.remove('active');
  currCard.classList.add('left');
  currCard.querySelector('div.card-inner').classList.remove('flip');
  nextCard.classList.add('active');
  renderPageText();
});

leftBtn.addEventListener('click', () => {
  const cards = Array.from(carousel.children);
  const activeCardIdx = cards.findIndex((card) => card.classList.contains('active'));
  if (activeCardIdx === 0) {
    return;
  }
  const currCard = cards[activeCardIdx];
  const nextCard = cards[activeCardIdx - 1];

  currCard.classList.remove('active');
  currCard.querySelector('div.card-inner').classList.remove('flip');
  nextCard.classList.remove('left');
  nextCard.classList.add('active');
  renderPageText();
});
