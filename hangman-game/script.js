const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgaintBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');
console.log(figureParts);
let selectedWord;

async function getWord() {
  const res = await fetch(
    `http://puzzle.mead.io/puzzle?wordCount=${Math.floor(
      Math.random() * (5 - 1) + 1
    )}`
  );
  const data = await res.json();
  selectedWord = data.puzzle.toLowerCase();
  console.log(selectedWord);
  displayWord();
}

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter =>
          `<span class="letter">${
            correctLetters.includes(letter) || letter === ' ' ? letter : '*'
          }</span>`
      )
      .join('')}
  `;

  if (
    selectedWord
      .replace(/ /g, '')
      .split('')
      .every(letter => correctLetters.includes(letter))
  ) {
    finalMessage.textContent = 'Congratulations! You won!';
    popup.style.display = 'flex';
  }
}

function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span> ${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'You Lost!';
    popup.style.display = 'flex';
  }
}

function showNotification() {
  notification.classList.add('show');
  setTimeout(() => notification.classList.remove('show'), 1500);
}

window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (selectedWord.includes(e.key)) {
      if (!correctLetters.includes(e.key)) {
        correctLetters.push(e.key);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(e.key)) {
        wrongLetters.push(e.key);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

playAgaintBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  getWord();
  updateWrongLettersEl();
  displayWord();

  popup.style.display = 'none';
});

getWord();
