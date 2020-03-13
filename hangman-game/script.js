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
      Math.random() * (6 - 2) + 2
    )}`
  );
  const data = await res.json();
  return data.puzzle;
}

const correctLetters = ['a'];
const wrongLetters = [];

async function displayWord() {
  selectedWord = await getWord();
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
      <span class="letter">${
        correctLetters.includes(letter) ? letter : ''
      }</span>
    `
      )
      .join('')}
  `;
}

displayWord();
