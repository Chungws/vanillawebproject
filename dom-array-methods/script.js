const addUserButton = document.getElementById('add-user');
const doubleMoneyButton = document.getElementById('double-money');
const showMillionaireButton = document.getElementById('show-millionaire');
const sortRichestButton = document.getElementById('sort-richest');
const sumWealthButton = document.getElementById('sum-wealth');
const personContainer = document.querySelector('.person-container');

const createPerson = ({ first, last }) => {
  const newPerson = document.createElement('div');
  newPerson.classList.add('person');

  const newName = document.createElement('h3');
  newName.classList.add('name');
  newName.textContent = `${first} ${last}`;

  const newWealth = document.createElement('h3');
  newWealth.classList.add('wealth');
  const randomWealth = Math.floor(Math.random() * 1_000_000);
  newWealth.textContent = `$${randomWealth.toLocaleString('en-US')}.00`;

  newPerson.appendChild(newName);
  newPerson.appendChild(newWealth);

  personContainer.appendChild(newPerson);
};

const createSumArea = (sum) => {
  const newSumText = document.createElement('h3');
  newSumText.classList.add('sum');
  newSumText.textContent = 'Total Wealth:';

  const newSum = document.createElement('strong');
  newSum.textContent = `$${sum.toLocaleString('en-US')}.00`;

  newSumText.appendChild(newSum);
  personContainer.appendChild(newSumText);
};

const clearSumArea = () => {
  const sumAreas = Array.from(personContainer.querySelectorAll('.sum'));
  sumAreas.forEach((sumArea) => { sumArea.remove(); });
};

const addRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();
  createPerson(data.results[0].name);
};

const createInitialPeople = () => {
  const promises = [];
  promises.push(addRandomUser());
  promises.push(addRandomUser());
  promises.push(addRandomUser());
  Promise.all(promises);
};

const getWealthNumber = (textWealth) => {
  const wealthNumberString = textWealth.split('$')[1].split('.')[0].replace(/\D/g, '');
  return Number(wealthNumberString);
};

const handleClickAddUserButton = () => {
  addRandomUser();
};

const handleClickDoubleMoneyButton = () => {
  const people = Array.from(personContainer.querySelectorAll('.person'));
  people.map((person) => {
    const doubledPerson = person;
    const wealthText = doubledPerson.querySelector('.wealth');
    const wealth = getWealthNumber(wealthText.textContent);
    const doubleWealth = wealth * 2;
    wealthText.textContent = `$${doubleWealth.toLocaleString('en-US')}.00`;
    return doubledPerson;
  }).forEach((person) => {
    personContainer.appendChild(person);
  });
};

const handleClickShowMillionaireButton = () => {
  const people = Array.from(personContainer.querySelectorAll('.person'));
  people.filter((person) => {
    const wealthText = person.querySelector('.wealth');
    const wealth = getWealthNumber(wealthText.textContent);
    return wealth < 1_000_000;
  }).forEach((person) => {
    person.remove();
  });
};

const handleClickSortRichestButton = () => {
  const people = Array.from(personContainer.querySelectorAll('.person'));
  people.sort((a, b) => {
    const wealthA = getWealthNumber(a.querySelector('.wealth').textContent);
    const wealthB = getWealthNumber(b.querySelector('.wealth').textContent);
    return wealthB - wealthA;
  }).forEach((person) => {
    personContainer.appendChild(person);
  });
};

const handleClickSumWealthButton = () => {
  const people = Array.from(personContainer.querySelectorAll('.person'));
  const total = people.reduce((accumulator, person) => accumulator + getWealthNumber(person.querySelector('.wealth').textContent), 0);
  createSumArea(total);
};

window.addEventListener('load', createInitialPeople);

addUserButton.addEventListener('click', handleClickAddUserButton);
addUserButton.addEventListener('click', clearSumArea);
doubleMoneyButton.addEventListener('click', handleClickDoubleMoneyButton);
doubleMoneyButton.addEventListener('click', clearSumArea);
showMillionaireButton.addEventListener('click', handleClickShowMillionaireButton);
showMillionaireButton.addEventListener('click', clearSumArea);
sortRichestButton.addEventListener('click', handleClickSortRichestButton);
sortRichestButton.addEventListener('click', clearSumArea);
sumWealthButton.addEventListener('click', handleClickSumWealthButton);
