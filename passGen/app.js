// dom elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// dom events
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value; // '+' work around parse to set var to number
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = genPass(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

// copy pw to clipboard
clipboardEl.addEventListener('click', () => {
  const textArea = document.createElement('textarea');
  const passWord = resultEl.innerText;

  if (!passWord) {
    return;
  }

  textArea.value = passWord;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
  alert('Password copied to clipboard!');
  textArea.value = '';
});

// generate password function needs following:
// 1. init genPW var
// 2. filter out unchecked types
// 3. loop over length of call generator function for each type
// 4. add final pw to the pw var and return
function genPass(upper, lower, number, symbol, length) {
  let genPW = '';
  const typesCount = upper + lower + number + symbol;

  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      genPW += randomFunc[funcName]();
    });
  }
  //remove unused char if 1 char selected
  const finalGenPW = genPW.slice(0, length);
  // console.log(length);
  // console.log(finalGenPW);
  // console.log(generateString(finalGenPW, length));
  return generateString(finalGenPW, length);
}

// create random string order func for pw generator
function generateString(char, length) {
  let result = '';
  const charLength = char.length;
  for (let i = 0; i < length; i++) {
    result += char.charAt(Math.floor(Math.random() * charLength));
  }

  return result;
}

// Browser Character Set - https://net-comber.com/charset.html
// create a charcode func factory
function createCharSet(charCount, CharStart) {
  return String.fromCharCode(Math.floor(Math.random() * charCount + CharStart));
}

// get random lowercase char
function getRandomLower() {
  const result = createCharSet(26, 97);
  return result;
}

// get random uppercase char
function getRandomUpper() {
  const result = createCharSet(26, 65);
  return result;
}

// get random number
function getRandomNumber() {
  const result = createCharSet(10, 45);
  return result;
}

// get random symbol
function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  let result = symbols[Math.floor(Math.random() * symbols.length)];
  return result;
}
