const main = document.getElementById('main');

const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillBtn = document.getElementById('show-mill');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// fetch users and add money

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json()

  const user = data['results'][0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(user => {
    const userEl = document.createElement('h3');

    userEl.classList.add('person');
    userEl.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`

    main.appendChild(userEl);
  })
}

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

function doubleMoney() {
  data = data.map(user => {
    return {
      ...user,
      money: user.money * 2
    }
  });
  updateDOM(data);
}

function sortByRichest() {
  const sortedData = data.sort((a, b) => b.money - a.money);
  updateDOM(sortedData);
}

function showMillionaires() {
  const millionaires = data.filter(person => person.money >= 1000000);
  updateDOM(millionaires);

}

function calculateWealth() {
  const totalWealth = data.reduce((acc, user) => acc + user.money, 0);
  const wealthEl = document.createElement('div');  
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(totalWealth)}</strong></h3>`
  main.appendChild(wealthEl);
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);