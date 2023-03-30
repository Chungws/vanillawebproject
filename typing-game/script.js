const wordText = document.querySelector('.game > h1');
const timeText = document.querySelector('.game > span.time');
const scoreText = document.querySelector('.game > span.score');
const endContainer = document.querySelector('div.end');
const input = document.querySelector('input');

let time = 10;
let addTime = 5;
let score = 0;

const words = (async function* wordGenerator() {
  while (true) {
    const data = await (await fetch('https://random-word-api.herokuapp.com/word?number=30')).json();
    yield* data;
  }
}());

const finishGame = () => {
  endContainer.classList.remove('hidden');
};

const startGame = async () => {
  const newWord = (await words.next()).value;
  timeText.textContent = `Time left: ${time}`;
  scoreText.textContent = `Score: ${score}`;
  wordText.textContent = newWord;
  const timer = setInterval(() => {
    time -= 1;
    timeText.textContent = `Time left: ${Math.floor(time)}`;
    if (time <= 0) {
      clearInterval(timer);
      finishGame();
    }
  }, 1000);
};

const updateForCorrection = async () => {
  const newWord = (await words.next()).value;
  score += 1;
  if (score % 5 === 0) {
    addTime -= 1;
  }
  time = time + addTime > 10 ? 10 : time + addTime;
  wordText.textContent = newWord;
  scoreText.textContent = `Score: ${score}`;
  endContainer.querySelector('p').textContent = `Your final score is ${score}`;
  input.value = '';
};

const updateAddTime = (difficulty) => {
  switch (difficulty) {
    case 'hard':
      addTime = 3;
      break;
    case 'medium':
      addTime = 4;
      break;
    case 'easy':
      addTime = 6;
      break;
    default:
  }
};

document.querySelector('button.setting').addEventListener('click', () => {
  const navClass = document.querySelector('nav').classList;
  if (navClass.contains('hide')) {
    navClass.remove('hide');
  } else {
    navClass.add('hide');
  }
});

document.querySelector('.end > button').addEventListener('click', () => {
  window.location.reload();
});

document.querySelector('select').addEventListener('change', (e) => {
  const difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
  updateAddTime(difficulty);
});

input.addEventListener('input', async (e) => {
  if (e.target.value === wordText.textContent) {
    await updateForCorrection();
  }
});

window.addEventListener('load', async () => {
  updateAddTime(localStorage.getItem('difficulty') || '');
  await startGame();
});
