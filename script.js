'use strict';

// selecting elements
const player0l = document.querySelector('.player--0');
const player1l = document.querySelector('.player--0');
const score0l = document.querySelector('#score--0');
const score1l = document.getElementById('score--1');
const dicel = document.querySelector('.dice');
const cur0l = document.getElementById('current--0');
const cur1l = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting condition
score0l.textContent = 0;
score1l.textContent = 0;
dicel.classList.add('hidden');

let scores, curScore, activePlayer, stillPlaying;

const switchPlayer = function () {
  curScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = curScore;

  // switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0l.classList.toggle('player--active');
  player1l.classList.toggle('player--active');
};

const closeGame = function (keyWord) {
  document.querySelector(`#${keyWord}--0`).textContent = 0;
  document.querySelector(`#${keyWord}--1`).textContent = 0;
};

const init = function () {
  curScore = 0;
  activePlayer = 0;
  stillPlaying = true;
  scores = [0, 0];
};
init();
// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (stillPlaying) {
    //1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    dicel.classList.remove('hidden');
    dicel.src = `dice-${dice}.png`;

    // 3. check roll 1
    if (dice !== 1) {
      // add dice to current score
      curScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        curScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (stillPlaying) {
    // 1. add current score to active player
    scores[activePlayer] += curScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if playre winner
    console.log(scores[activePlayer]);
    if (scores[activePlayer] >= 100) {
      // finish game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      stillPlaying = false;
      dicel.classList.add('hidden');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// new game sitting
btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  init();

  player0l.classList.add('player--active');
  closeGame('score');
  closeGame('current');
});
