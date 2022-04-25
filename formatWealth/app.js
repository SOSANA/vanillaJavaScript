const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const ShowMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];
  console.log(user);
}
