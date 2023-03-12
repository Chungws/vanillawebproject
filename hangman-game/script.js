import HangmanGame from './hangman.js'; // eslint-disable-line

const playAgainButton = document.querySelector('div.modal > button');

const hangman = new HangmanGame();

const handleKeyDown = (e) => {
  const { key, keyCode } = e;
  if (keyCode < 65 || keyCode > 90) {
    return;
  }
  hangman.handlePressKey(key);
};

const handleClickPlayAgainButton = () => {
  hangman.handleClickPlayAgainButton();
};

window.addEventListener('keydown', handleKeyDown);
playAgainButton.addEventListener('click', handleClickPlayAgainButton);
