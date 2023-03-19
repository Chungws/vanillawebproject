const searchInput = document.querySelector('form > input');
const searchButton = document.getElementById('search');
const randomButton = document.getElementById('random');
const searchResultsText = document.querySelector('#meals > h2');
const mealsContainer = document.querySelector('#meals > div.grid');
const mealInfo = document.getElementById('meal-info');

const fetchMeals = async (keyword) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
  const data = await response.json();
  return data;
};

const fetchRandomMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data;
};

const renderMeals = () => {
  mealsContainer.classList.remove('hidden');
  searchResultsText.classList.remove('hidden');
  mealInfo.classList.add('hidden');
};

const renderInfo = () => {
  mealsContainer.classList.add('hidden');
  searchResultsText.classList.add('hidden');
  mealInfo.classList.remove('hidden');
};

const createIngredient = () => {
  const ingredientList = mealInfo.querySelector('section.detail > ul');
  const newIngredient = document.createElement('li');
  ingredientList.appendChild(newIngredient);
  return newIngredient;
};

const updateIngredient = (ingredientEl, ingredient, measure) => {
  ingredientEl.textContent = `${ingredient} - ${measure}`;
};

const processIngredients = (ingredients, meal) => {
  let maxIngredientIdx = 0;
  Object.entries(meal)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .forEach((_, idx) => {
      updateIngredient(ingredients[idx] || createIngredient(), meal[`strIngredient${idx + 1}`], meal[`strMeasure${idx + 1}`]);
      maxIngredientIdx = idx;
    });

  ingredients.slice(maxIngredientIdx + 1).forEach((ingredient) => {
    ingredient.remove();
  });
};

const updateMealInfo = (meal) => {
  const {
    strMeal, strMealThumb, strCategory, strArea, strInstructions,
  } = meal;

  mealInfo.querySelector('h1').textContent = strMeal;
  const img = mealInfo.querySelector('img');
  img.src = strMealThumb;
  img.alt = strMeal;

  const [category, area] = mealInfo.querySelectorAll('section.brief > p');
  category.textContent = strCategory;
  area.textContent = strArea;

  const detail = mealInfo.querySelector('section.detail');
  detail.querySelector('p').textContent = strInstructions;
  const ingredients = Array.from(detail.querySelectorAll('ul.ingredients > li'));
  processIngredients(ingredients, meal);
};

const createMeal = () => {
  const newMeal = document.createElement('div');
  newMeal.classList.add('meal');
  newMeal.classList.add('container');
  mealsContainer.appendChild(newMeal);

  const newMealImg = document.createElement('img');
  newMeal.appendChild(newMealImg);

  const newMealName = document.createElement('div');
  newMealName.classList.add('meal-name');
  newMealName.classList.add('container');
  newMeal.appendChild(newMealName);

  const newMealNameText = document.createElement('h3');
  newMealName.appendChild(newMealNameText);

  return newMeal;
};

const updateMeal = (mealEl, meal) => {
  mealEl.classList.remove('hidden');
  const { strMealThumb, strMeal } = meal;
  const mealImg = mealEl.querySelector('img');
  mealImg.src = strMealThumb;
  mealImg.alt = strMeal;

  const mealNameText = mealEl.querySelector('div > h3');
  mealNameText.textContent = strMeal;
  mealEl.addEventListener('click', () => {
    renderInfo();
    updateMealInfo(meal);
  });
};

const processMeal = (mealEl, meal) => {
  if (!meal) {
    mealEl.classList.add('hidden');
    return;
  }

  updateMeal(mealEl || createMeal(), meal);
};

const handleClickSearchButton = async (e) => {
  e.preventDefault();
  renderMeals();
  const keyword = searchInput.value;
  searchInput.value = '';
  const { meals } = await fetchMeals(keyword);
  const mealEls = Array.from(document.querySelectorAll('.meal'));
  if (meals) {
    searchResultsText.textContent = `Search results for '${keyword}':`;
    (mealEls.length > meals.length ? mealEls : meals).forEach((_, idx) => {
      processMeal(mealEls[idx], meals[idx]);
    });
  } else {
    searchResultsText.textContent = 'There are no search results. Try again!';
    mealEls.forEach((mealEl) => { mealEl.classList.add('hidden'); });
  }
};

const handleClickRandomButton = async (e) => {
  e.preventDefault();
  const { meals: [meal] } = await fetchRandomMeals();
  renderInfo();
  updateMealInfo(meal);
};

searchButton.addEventListener('click', handleClickSearchButton);
randomButton.addEventListener('click', handleClickRandomButton);
