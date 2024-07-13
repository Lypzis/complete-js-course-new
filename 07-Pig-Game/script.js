'use strict';

// Elements
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Variables
const WINNING_SCORE = 100;
const players = [
  {
    id: 'player0',
    score: 0,
    active: true,
    totalScore: 0,
    playerEl: document.querySelector('.player--0'),
    scoreEl: document.getElementById('score--0'),
    currentEl: document.getElementById('current--0'),
  },
  {
    id: 'player1',
    score: 0,
    active: false,
    totalScore: 0,
    playerEl: document.querySelector('.player--1'),
    scoreEl: document.getElementById('score--1'),
    currentEl: document.getElementById('current--1'),
  },
];

// Get Active Player(remember, 'find' will get the original object, not a copy)
function getActivePlayer() {
  return players.find(player => player.active);
}

// Update element text content
function updateElementText(el, text) {
  el.textContent = text;
}

// Enable buttons
function enableControlButtons(enable = true) {
  btnHold.disabled = !enable;
  btnRoll.disabled = !enable;
}

// Add score to active player
function addScoreToPlayer(dice) {
  const activePlayer = getActivePlayer();

  activePlayer.score += dice;

  updateElementText(activePlayer.currentEl, activePlayer.score);
}

// Switch active player
function switchPlayer() {
  const activePlayer = getActivePlayer();

  // Set current player score to 0
  activePlayer.score = 0;
  updateElementText(activePlayer.currentEl, 0);

  // Switch the active player
  players.forEach(player => {
    player.active = !player.active;
    player.playerEl.classList.toggle('player--active', player.active);
  });
}

function rollDice() {
  // Generate a random dice roll number(1-6)
  const dice = Math.trunc(Math.random() * 6) + 1;

  // Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `./dice-${dice}.png`;

  // Check for rolled 1.
  if (dice !== 1) {
    // Add dice to current score
    addScoreToPlayer(dice);
  } else {
    // switch to next player
    switchPlayer();
  }
}

function holdScore() {
  const activePlayer = getActivePlayer();

  // Adds player current score to total score
  activePlayer.totalScore += activePlayer.score;
  updateElementText(activePlayer.scoreEl, activePlayer.totalScore);

  // if player total score is >= WINNING_SCORE, player wins, otherwise, switch player
  if (activePlayer.totalScore >= WINNING_SCORE) {
    activePlayer.playerEl.classList.add('player--winner');
    activePlayer.playerEl.classList.remove('player--active');
    enableControlButtons(false);
  } else {
    switchPlayer();
  }
}

function startGame() {
  diceEl.classList.add('hidden');
  enableControlButtons();

  players.forEach(player => {
    // Can consider using Batched DOM here
    // for these 2 elements for optimization
    updateElementText(player.scoreEl, 0);
    updateElementText(player.currentEl, 0);

    player.score = 0;
    player.totalScore = 0;
    player.active = false;
    player.playerEl.classList.remove('player--winner');
  });

  // player 1 always starts first on new game
  players[0].playerEl.classList.add('player--active');
  players[0].active = true;
}

startGame();

// Event Listeners
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', startGame);
