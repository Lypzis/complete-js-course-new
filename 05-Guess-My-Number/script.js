'use strict';

// the DOM(like the 'document' below) is part of Web API, not JS :D
/* const messageEl = document.querySelector('.message');

console.log(messageEl.textContent);

messageEl.textContent = 'Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 20;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value); */

const getEl = elClass => document.querySelector(elClass);

const guessValueEl = getEl('.guess');
const checkButtonEl = getEl('.btn.check');
const againButtonEl = getEl('.btn.again');
const messageEl = getEl('.message');
const numberEl = getEl('.number');
const scoreEl = getEl('.score');
const bodyEl = getEl('body');

// state variables, as parte of the state of the application
let secretNumber = generateSecretNumber();
let score = 20;
////////////////////////

function generateSecretNumber() {
  return Math.trunc(Math.random() * 20);
}

function checkWrongSecretNumber(customMessage) {
  if (score > 1) {
    score--;
    messageEl.textContent = customMessage;
    scoreEl.textContent = score;
  } else {
    messageEl.textContent = 'You lost the game!';
    scoreEl.textContent = 0;
  }
}

// only litteral numbers allowed in the input :D
guessValueEl.addEventListener('input', function () {
  this.value = this.value.replace(/[eE+-]/g, '');
});

againButtonEl.addEventListener('click', () => {
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
});

checkButtonEl.addEventListener('click', () => {
  const guessValue = Number(guessValueEl.value);

  // no input
  if (!guessValue) {
    messageEl.textContent = 'No number!';
  }
  // player wins
  else if (guessValue === secretNumber) {
    numberEl.textContent = secretNumber;
    messageEl.textContent = 'Correct number!';

    // inline styles
    bodyEl.style.backgroundColor = '#60b347';
    numberEl.style.width = '30rem';

    // disable check button
    checkButtonEl.disabled = true;
  }
  // wrong number
  else if (guessValue > secretNumber) {
    checkWrongSecretNumber('Too high!');
  }
  // wrong number
  else if (guessValue < secretNumber) {
    checkWrongSecretNumber('Too low!');
  }
});
