const resetBtn = document.querySelector('.congrats > button');
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition(); // eslint-disable-line
recognition.lang = 'en-En';

const init = () => {
  const congrats = document.querySelector('.congrats');
  const resultBox = document.querySelector('.result');
  const hint = document.querySelector('.hint');

  congrats.classList.add('hidden');
  resultBox.classList.add('hidden');

  const number = Math.floor(Math.random() * 99 + 1);
  // console.log(number);
  document.querySelectorAll('.congrats > h2')[1].textContent = `It was ${number}`;

  recognition.start();
  recognition.addEventListener('result', (e) => {
    const word = e.results[0][0].transcript;
    const wordWrapper = document.querySelector('.word-wrapper > p');

    resultBox.classList.remove('hidden');
    wordWrapper.textContent = word;

    const numWord = Number(word);

    if (Number.isNaN(numWord)) {
      hint.textContent = 'That is not a valid number';
      return;
    }

    if (numWord < 1 || numWord > 100) {
      hint.textContent = 'Number must be between 1 and 100';
      return;
    }

    if (numWord === number) {
      congrats.classList.remove('hidden');
    } else if (numWord < number) {
      hint.textContent = 'GO HIGHER';
    } else {
      hint.textContent = 'GO LOWER';
    }
  });

  recognition.addEventListener('end', () => {
    recognition.stop();
    recognition.start();
  });
};

window.addEventListener('load', init);
resetBtn.addEventListener('click', () => { window.location.reload(); });
