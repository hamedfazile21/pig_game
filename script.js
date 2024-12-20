'use strict';
//btn
const roll_btn = document.querySelector('.btn--roll');
const hold_btn = document.querySelector('.btn--hold');
const new_btn = document.querySelector('.btn--new');
//
const dice_image = document.querySelector('.dice');
const players = document.querySelectorAll('.player');

// scores
const total_score_elements = document.querySelectorAll('.score');
const current_score_elements = document.querySelectorAll('.current-score');

// event listener
new_btn.addEventListener('click', newGame);
roll_btn.addEventListener('click', randomDice);
hold_btn.addEventListener('click', hold_score);


let current_score, total_score, active_player, win;

// the default form of the game and reset game btn
function newGame() {
  dice_image.classList.add('hidden');
  for (let i = 0; i < total_score_elements.length; i++) {
    total_score_elements[i].textContent = 0;
    current_score_elements[i].textContent = 0;
  }
  win = true;
  players[0].classList.add('player--active');
  players[1].classList.remove('player--active');
  current_score = 0;
  active_player = 0;
  total_score = [0, 0];
  players[active_player].classList.remove('player--winner');
}
newGame();

// when we need to switch the player

function switch_player() {
  // set the values to 0
  current_score_elements[active_player].textContent = 0;
  current_score = 0;
  // clear the current player
  active_player = active_player === 0 ? 1 : 0;


  // toggle the active player class 
  for (let i = 0; i < players.length; i++) {
    players[i].classList.toggle('player--active');
  }
}

// random dice
function randomDice() {
  if (win) {
    // we should check the dice , if it's one we switch the player if it's not add to current score
    const random_dice = Math.trunc(Math.random() * 6) + 1;
    dice_image.classList.remove('hidden');
    dice_image.src = `./image/dice-${random_dice}.png`;

    // if it's not one
    if (random_dice !== 1) {
      current_score += random_dice;
      current_score_elements[active_player].textContent = current_score;
    } else {
      // if it's one and
      switch_player();
    }
  }
}

// hold the scores and switch the player
function hold_score() {
  if (win) {
    // add the current score to the total score
    total_score[active_player] += current_score;
    total_score_elements[active_player].textContent = total_score[active_player];
    // when one of the player wins
    if (total_score[active_player] >= 100) {
      win = false;
      players[active_player].classList.add('player--winner');
      players[active_player].classList.remove('player--active');
    } else {
      switch_player();
    }
  }
}
