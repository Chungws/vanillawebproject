const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confimPasswordInput = document.getElementById('confirmPassword');
const submitButton = document.getElementById('submitButton');

const initialErrorMessage = 'Error message';

function setError(input, message) {
  input.classList.remove('correct');
  input.classList.add('error');
  const errorMessage = input.nextElementSibling;
  errorMessage.innerText = message;
  errorMessage.classList.remove('hide');
}

function setCorrect(input, message = initialErrorMessage) {
  input.classList.remove('error');
  input.classList.add('correct');
  const errorMessage = input.nextElementSibling;
  errorMessage.innerText = message;
  errorMessage.classList.add('hide');
}

function checkRequired(inputs) {
  let isRequired = true;
  inputs.forEach((input) => {
    if (input.value === '') {
      setError(input, `${input.previousElementSibling.innerText} is required`);
      isRequired = false;
    } else {
      setCorrect(input);
    }
  });
  return isRequired;
}

function checkLength(input, min, max) {
  const inputName = input.previousElementSibling.innerText;
  if (input.value.length < min) {
    setError(input, `${inputName} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    setError(input, `${inputName} must be at less than ${max} characters`);
  } else {
    setCorrect(input);
  }
}

function checkEmail() {
  const regex = /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
  if (regex.test(emailInput.value)) {
    setCorrect(emailInput);
  } else {
    setError(emailInput, 'Email is not valid');
  }
}

function checkPassworkdsMatch() {
  const password = passwordInput.value;
  const confirmPassword = confimPasswordInput.value;
  if (confirmPassword === '') return;
  if (password !== confirmPassword) {
    setError(confimPasswordInput, 'Passwords do not match');
  }
}

function handleClickSubmitButton(e) {
  e.preventDefault();
  checkRequired([usernameInput, emailInput, passwordInput, confimPasswordInput]);
  checkLength(usernameInput, 3, 15);
  checkLength(passwordInput, 6, 25);
  checkEmail();
  checkPassworkdsMatch();
}

submitButton.addEventListener('click', handleClickSubmitButton);
