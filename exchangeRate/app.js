// select dom elements
const curElOne = document.getElementById('currency-one');
const amountElOne = document.getElementById('amount-one');
const curElTwo = document.getElementById('currency-two');
const amountElTwo = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// fetch exchange rate and update dom
function getRates() {
  const curOne = curElOne.value;
  const curTwo = curElTwo.value;
  // console.log(curOne, curTwo);

  fetch(`https://open.exchangerate-api.com/v6/latest`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.rates[curTwo] / data.rates[curOne];
      rateEl.innerText = `1 ${curOne} = ${rate} ${curTwo}`;
      amountElTwo.value = (amountElOne.value * rate).toFixed(2);
    });
}

// event listeners
curElOne.addEventListener('change', getRates);
amountElOne.addEventListener('input', getRates);
curElTwo.addEventListener('change', getRates);
amountElTwo.addEventListener('input', getRates);

swap.addEventListener('click', () => {
  const temp = curElOne.value;
  curElOne.value = curElTwo.value;
  curElTwo.value = temp;
  getRates();
});

getRates();
