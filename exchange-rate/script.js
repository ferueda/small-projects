const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swap');

// fetch exchange rate and update the DOM
function calculate() {
  const currencyOneValue = currencyOne.value;
  const currencyTwoValue = currencyTwo.value;
  
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currencyTwoValue];
      rateEl.innerText = `1 ${currencyOneValue} = ${rate.toFixed(4)} ${currencyTwoValue}`;

      amountTwo.value = (amountOne.value * rate).toFixed(4);
    });

  

}

// event listeners
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('change', calculate);
amountTwo.addEventListener('change', calculate);

calculate();