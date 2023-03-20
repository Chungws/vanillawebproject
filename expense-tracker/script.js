const transactionForm = document.querySelector('form');
const addTransactionButton = transactionForm.querySelector('button');
let expenses;

const generateRandomString = (length = 8) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const saveNewTransaction = (text, amount) => {
  const id = generateRandomString();
  expenses[id] = {
    id,
    text,
    amount,
  };
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

const deleteExpense = (id) => {
  delete expenses[id];
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

const createHistory = () => {
  const historyList = document.querySelector('#history-area > ul');
  const history = document.createElement('li');
  history.classList.add('card');
  history.classList.add('history');

  history.appendChild(document.createElement('span'));
  history.appendChild(document.createElement('span'));

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.textContent = 'X';
  history.appendChild(deleteButton);

  historyList.appendChild(history);

  return history;
};

const resetHistoryList = () => {
  Array.from(document.querySelectorAll('#history-area > ul > li'))
    .forEach((li) => li.remove());
};

const updateSummary = () => {
  const { income, expense, total } = Object.values(expenses).reduce((acc, cur) => {
    const amount = Number(cur.amount || 0);
    if (amount < 0) {
      acc.expense += amount;
    } else {
      acc.income += amount;
    }
    acc.total += amount;
    return acc;
  }, { income: 0, expense: 0, total: 0 });

  const summaryArea = document.getElementById('summary-area');
  const totalText = summaryArea.querySelector('h1');
  totalText.textContent = `$${total.toFixed(2)}`;

  const incomeText = summaryArea.querySelector('#income-summary > p');
  incomeText.textContent = `$${income.toFixed(2)}`;

  const expenseText = summaryArea.querySelector('#expense-summary > p');
  expenseText.textContent = `$${expense.toFixed(2)}`;
};

const updateHistory = () => {
  resetHistoryList();
  Object.values(expenses).forEach((value) => {
    const { id, text, amount } = value;
    const positive = Number(amount) > 0;
    const history = createHistory();
    history.classList.add(positive ? 'plus' : 'minus');
    const [textText, amountText] = history.querySelectorAll('span');
    textText.textContent = text;
    amountText.textContent = (positive ? '+' : '') + amount;

    const deleteButton = history.querySelector('button');
    deleteButton.addEventListener('click', () => {
      history.remove();
      deleteExpense(id);
    });
  });
};

const handleClickAddTransactionButton = (e) => {
  e.preventDefault();
  const [textEl, amountEl] = Array.from(transactionForm.querySelectorAll('input'));
  const text = textEl.value;
  const amount = amountEl.value;

  if (!(text && amount)) {
    alert('Please add a text and amount');
    return;
  }

  saveNewTransaction(text, amount);
  textEl.value = '';
  amountEl.value = '';
};

const handleChangeLocalStorage = () => {
  updateSummary();
  updateHistory();
};

const loadExpenses = () => {
  expenses = JSON.parse(localStorage.getItem('expenses')) || {};
  handleChangeLocalStorage();
};

window.addEventListener('load', loadExpenses);
window.addEventListener('storage', handleChangeLocalStorage);

addTransactionButton.addEventListener('click', handleClickAddTransactionButton);
