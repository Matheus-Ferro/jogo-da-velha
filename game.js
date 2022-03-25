let board = ["", "", "", "", "", "", "", "", ""];
let player_time = 0;
let game_over = false;
let draw = false;
let symbols = ["o", "x"];
let win_states = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let sequence_winner;

function handle_move(position) {
  if (game_over) {
    return;
  }
  if (board[position] == "") {
    board[position] = symbols[player_time];
    game_over = is_winner();
    draw = is_draw();
    if (!game_over && !draw) {
      player_time = player_time == 0 ? 1 : 0;
      for (let i = 0; i < board.length; i++) {}
    }
  }
  return game_over;
}

function is_winner() {
  for (let i = 0; i < win_states.length; i++) {
    let seq = win_states[i];
    let pos1 = seq[0];
    let pos2 = seq[1];
    let pos3 = seq[2];
    sequence_winner = seq;

    if (
      board[pos1] == board[pos2] &&
      board[pos1] == board[pos3] &&
      board[pos1] != ""
    ) {
      return true;
    }
  }
}

function is_draw() {
  let i = 0;
  board.forEach((x) => {
    if (x != "") {
      i++;
    }
  });
  if (i == board.length) {
    handle_reset_game();
    return true;
  }
}

function reset_game() {
  board = ["", "", "", "", "", "", "", "", ""];
  player_time = 0;
  game_over = false;
  draw = false;
}
