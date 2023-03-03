const countrySelect1 = document.querySelector('#currency-country1');
const currencyInput1 = document.querySelector('#currency-account1');
const countrySelect2 = document.querySelector('#currency-country2');
const currencyInput2 = document.querySelector('#currency-account2');
const swapButton = document.querySelector('.swap-rate-box > button');
const rateText = document.querySelector('.swap-rate-box > p');

const exchangeValue = (elem1, elem2) => {
  const temp = elem1.value;
  elem1.value = elem2.value;
  elem2.value = temp;
};

const updateRateText = () => {
  rateText.textContent = `${Number(currencyInput1.value).toFixed(2)} ${countrySelect1.value} = ${Number(currencyInput2.value).toFixed(2)} ${countrySelect1.value}`;
};

const caculateRelativeRatio = () => {
  fetch('https://open.er-api.com/v6/latest')
    .then((res) => res.json())
    .then((data) => {
      const first = countrySelect2.value;
      const second = countrySelect1.value;
      const rate = data.rates[second] / data.rates[first];
      currencyInput2.value = currencyInput1.value * rate;
      updateRateText();
    });
};

const initSelectInput = () => {
  fetch('https://open.er-api.com/v6/latest')
    .then((res) => res.json())
    .then((response) => {
      Object.entries(response.rates)
        .forEach(([country]) => {
          Object.entries({ USD: countrySelect1, EUR: countrySelect2 })
            .forEach(([defaultCountry, select]) => {
              const option = new Option(country, country);
              if (country === defaultCountry) {
                option.selected = true;
              }
              select.add(option);
            });
        });

      currencyInput1.value = response.rates[countrySelect1.value];
      currencyInput2.value = response.rates[countrySelect2.value];
      updateRateText();
    });
};

const handleClickSwapButton = () => {
  exchangeValue(countrySelect1, countrySelect2);
  exchangeValue(currencyInput1, currencyInput2);
  updateRateText();
};

countrySelect1.addEventListener('change', caculateRelativeRatio);
countrySelect2.addEventListener('change', caculateRelativeRatio);
currencyInput1.addEventListener('input', caculateRelativeRatio);
swapButton.addEventListener('click', handleClickSwapButton);

initSelectInput();
