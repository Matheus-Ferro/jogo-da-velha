let names = ["Player 1", "Player 2"];

document.addEventListener("DOMContentLoaded", () => {
  let squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.dataset.content = square.id;
    square.addEventListener("click", handle_click);
  });
  update_turn_indicator();
});

function change_name() {
  let player1 = document.getElementById("player1_name");
  let player2 = document.getElementById("player2_name");
  player1.addEventListener("focusout", () => {
    if (player1.value == "") {
      names[0] = "Player 1";
    } else {
      names[0] = player1.value;
    }
  });
  player2.addEventListener("focusout", () => {
    if (player2.value == "") {
      names[1] = "Player 2";
    } else {
      names[1] = player2.value;
    }
  });
}
change_name();

function handle_click(event) {
  let square = event.target;
  let position = square.id;
  if (handle_move(position)) {
    score(player_time);
    modal(player_time);
  }
  update_square(position);
  update_turn_indicator();
}

function modal(victorious) {
  let modal = document.getElementById("modal");
  let winner = document.getElementById("winner");
  let sequence = document.getElementById("sequence");
  let chain = sequence_winner.join([(separator = ", ")]);
  modal.style.display = "block";
  winner.innerHTML = names[victorious];
  sequence.innerHTML = `Winning Chain ${chain}`;
}

function update_square(position) {
  let square = document.getElementById(position.toString());
  let symbol = board[position];
  square.innerHTML = `<div class='${symbol}'></div>`;
}

function update_turn_indicator() {
  let player1_indicator = document.getElementById("label_player1");
  let player2_indicator = document.getElementById("label_player2");
  if (player_time) {
    player2_indicator.dataset.content = "|";
    player1_indicator.dataset.content = "";
  } else {
    player1_indicator.dataset.content = "|";
    player2_indicator.dataset.content = "";
  }
}

function handle_reset_game() {
  let modal = document.getElementById("modal");
  modal.style.display = "none";
  document
    .querySelectorAll(".square")
    .forEach((square) => (square.innerHTML = ""));
  reset_game();
  update_turn_indicator();
}

function score(player_time) {
  player1 = document.getElementById("player1_score");
  player2 = document.getElementById("player2_score");
  player1_score = parseInt(player1.innerHTML);
  player2_score = parseInt(player2.innerHTML);

  if (player_time) {
    player2_score += 1;
    player2.innerHTML = player2_score;
  } else {
    player1_score += 1;
    player1.innerHTML = player1_score;
  }
}

function reset_score() {
  document.getElementById("player1_score").innerHTML = 0;
  document.getElementById("player2_score").innerHTML = 0;
  handle_reset_game();
}
