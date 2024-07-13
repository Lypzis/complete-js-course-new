'use strict';

// the DOM(like the 'document' below) is part of Web API, not JS :D
/* const messageEl = document.querySelector('.message');

console.log(messageEl.textContent);

messageEl.textContent = 'Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 20;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value); */

// Helper function to get DOM elements
const getEl = elClass => document.querySelector(elClass);

// Get DOM elements
const guessValueEl = getEl('.guess');
const checkButtonEl = getEl('.btn.check');
const againButtonEl = getEl('.btn.again');
const messageEl = getEl('.message');
const numberEl = getEl('.number');
const scoreEl = getEl('.score');
const bodyEl = getEl('body');
const highscoreEl = getEl('.highscore');

// State variables
let secretNumber = generateSecretNumber();
let score = 20;
let highscore = 0;

// Generate a secret number
function generateSecretNumber() {
  return Math.trunc(Math.random() * 20);
}

// Update message and score
function updateMessageAndScore(message, newScore) {
  messageEl.textContent = message;
  scoreEl.textContent = newScore;
}

// Check if guess is wrong
function checkWrongSecretNumber(guessValue) {
  if (score > 1) {
    score--;
    updateMessageAndScore(
      guessValue > secretNumber ? 'Too high!' : 'Too low!',
      score
    );
  } else {
    updateMessageAndScore('You lost the game!' ? 'Too high!' : 'Too low!', 0);
  }
}

// Handle the correct guess
function handleCorrectGuess() {
  numberEl.textContent = secretNumber;
  messageEl.textContent = 'Correct number!';

  // inline styles
  bodyEl.style.backgroundColor = '#60b347';
  numberEl.style.width = '30rem';

  // disable check button
  checkButtonEl.disabled = true;

  if (score > highscore) {
    highscore = score;
    highscoreEl.textContent = highscore;
  }
}

// Reset the game
function resetGame() {
  // reset score
  score = 20;
  scoreEl.textContent = score;

  // hides secret number
  numberEl.textContent = '?';

  // empty input value
  guessValueEl.value = '';

  // restore background and number to normal
  bodyEl.style.backgroundColor = '#222';
  numberEl.style.width = '15rem';

  // generate new secret number
  secretNumber = generateSecretNumber();

  // reenables check button
  checkButtonEl.disabled = false;
}

// only litteral numbers allowed in the input :D
guessValueEl.addEventListener('input', function () {
  this.value = this.value.replace(/[eE+-]/g, '');
});

// Reset game on 'Again' button click
againButtonEl.addEventListener('click', resetGame);

// Check the guess on 'Check' button click
checkButtonEl.addEventListener('click', () => {
  const guessValue = Number(guessValueEl.value);

  if (!guessValue) {
    messageEl.textContent = 'No number!';
  } else if (guessValue === secretNumber) {
    handleCorrectGuess();
  } else if (guessValue !== secretNumber) {
    checkWrongSecretNumber(guessValue);
  }
});
