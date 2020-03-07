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

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);