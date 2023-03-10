const body = document.querySelector('body');
const hamburgerButton = document.querySelector('button.hamburger');
const signUpButton = document.querySelector('button.sign-up');
const modal = document.querySelector('div.modal');
const modalBackground = document.querySelector('div.modal-background');
const modalSubmitButton = document.querySelector('button.submit');

const handleClickHamburgerButton = () => {
  if (body.classList.contains('show-nav')) {
    body.classList.remove('show-nav');
  } else {
    body.classList.add('show-nav');
  }
};

const handleClickSignUpButton = () => {
  modal.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
};

const handleClickModalSubmitButton = () => {
  const errorMessages = Array.from(document.querySelectorAll('small.error'));
  const shownErrorMessages = errorMessages.filter((errorMessage) => !errorMessage.classList.contains('hide'));
  if (shownErrorMessages.length === 0) {
    closeModal();
  }
};

hamburgerButton.addEventListener('click', handleClickHamburgerButton);
signUpButton.addEventListener('click', handleClickSignUpButton);
modalSubmitButton.addEventListener('click', handleClickModalSubmitButton);
modalBackground.addEventListener('click', closeModal);
