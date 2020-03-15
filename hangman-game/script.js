const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letter');
const playAgaintBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');
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
            correctLetters.includes(letter) || letter === ' ' ? letter : 'x'
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
  console.log('Update Wong');
}

function showNotification() {
  notification.classList.add('show');
  setTimeout(() => notification.classList.remove('show'), 1000);
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

getWord();
