import countryNames from './countryNames.js'; // eslint-disable-line

class HangmanGame {
  constructor() {
    this.wordContainer = document.querySelector('.word-container');
    this.wrongLetterContainer = document.querySelector('.wrong');
    this.wrongLetterText = this.wrongLetterContainer.querySelector('.wrong-letters');
    this.hangman = Array.from(document.querySelectorAll('.hangman'));
    this.popup = document.querySelector('.modal-container');
    this.toast = document.querySelector('.toast');
    this.letters = Array.from(document.querySelectorAll('.letter'));
    this.word = '';
    this.countryNames = countryNames;
    this.enteredLetters = new Set();
    this.wrongLetters = [];
    this.setNewWord();
  }

  * setRandomWords() {
    const processedCountryNames = this.countryNames
      .map((name) => name.toLowerCase())
      .filter((name) => !name.includes(' '))
      .sort(() => Math.random() - 0.5);
    yield* processedCountryNames;
  }

  clearGame() {
    this.letters.forEach((letter) => {
      letter.remove();
    });
    this.enteredLetters.clear();
    this.clearWrongLetter();
  }

  setNewWord() {
    this.clearGame();
    const generator = this.setRandomWords();
    this.word = generator.next().value;

    [...this.word].forEach((char) => {
      const span = document.createElement('span');
      span.setAttribute('draggable', false);
      span.textContent = char;
      span.classList.add('letter');
      this.wordContainer.appendChild(span);
    });

    this.letters = Array.from(document.querySelectorAll('.letter'));
  }

  handlePressKey(entered) {
    if (this.enteredLetters.has(entered)) {
      this.showDuplicatedToast();
      return;
    }
    this.enteredLetters.add(entered);
    if (this.word.includes(entered)) {
      this.processCorrectLetter(entered);
    } else {
      this.processWrongLetter(entered);
    }
    this.checkFinished();
  }

  handleClickPlayAgainButton() {
    this.setNewWord();
    this.popup.classList.add('hidden');
    this.popup.querySelector('p').classList.add('hidden');
  }

  processCorrectLetter(entered) {
    this.letters
      .forEach((letter) => {
        if (letter.textContent === entered) {
          letter.classList.add('show');
        }
      });
  }

  clearWrongLetter() {
    this.wrongLetters = [];
    this.wrongLetterContainer.classList.add('hidden');
    this.setWrongLetterText();
    this.hangman.forEach((part) => part.classList.add('hidden'));
  }

  processWrongLetter(entered) {
    this.wrongLetterContainer.classList.remove('hidden');
    this.wrongLetters.push(entered);
    this.setWrongLetterText();
    this.showHangmanPart();
  }

  setWrongLetterText() {
    this.wrongLetterText.textContent = this.wrongLetters.join(',');
  }

  showHangmanPart() {
    const first = this.hangman.find((part) => part.classList.contains('hidden'));
    first.classList.remove('hidden');
  }

  checkFinished() {
    if (!this.letters.find((letter) => !letter.classList.contains('show'))) {
      this.showResultPopup(true);
    }

    if (!this.hangman.find((part) => part.classList.contains('hidden'))) {
      this.showResultPopup(false);
    }
  }

  showResultPopup(succeed) {
    this.popup.querySelector('h2').textContent = succeed ? 'Congratulations! You won! 😃' : 'Unfortunately You lost. 😕';
    if (!succeed) {
      const answerText = this.popup.querySelector('p');
      answerText.classList.remove('hidden');
      answerText.textContent = `The answer was ${this.word}`;
    }
    this.popup.classList.remove('hidden');
  }

  showDuplicatedToast() {
    this.toast.classList.add('show');
    setTimeout(() => { this.toast.classList.remove('show'); }, 3000);
  }
}

export default HangmanGame;
