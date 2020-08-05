const GameManager = (() => {
  let turnX = false;
  return {
    changeTurn(player1, player2) {
      turnX = !turnX;
      return turnX ? player1.getPiece() : player2.getPiece();
    },
  };
})();

const Gameboard = (() => {
  const gameboard = ['', '', '', '', '', '', '', '', ''];
  const winningCombinations = {
    1: [0, 3, 6],
    2: [1, 4, 7],
    3: [2, 5, 8],
    4: [0, 1, 2],
    5: [3, 4, 5],
    6: [6, 7, 8],
    7: [0, 4, 8],
    8: [2, 4, 6],
  };
  return {
    changeBoard(piece, index) {
      if (gameboard[index] === '') {
        gameboard[index] = piece;
        return true;
      }
      return false;
    },
    displayBoard() {
      return gameboard;
    },
    checkWinner() {
      const winningK = Object.keys(winningCombinations);
      for (let i = 0; i < winningK.length; i += 1) {
        if (winningCombinations[i + 1].every(a => gameboard[a] === 'x' || gameboard[a] === 'o')) return gameboard[i];
      }
      return false;
    },
  };
})();

const Player = (name, piece, score = 0) => {
  const getName = () => name;
  const getPiece = () => piece;
  const getScore = () => score;
  return {
    getName,
    getPiece,
    getScore,
  };
};

function render(gameboard) {
  const board = document.querySelectorAll('.board-cell');
  for (let i = 0; i < gameboard.length; i += 1) {
    board[i].innerHTML = gameboard[i];
  }
}

let player1 = Player('Bob', 'x');
let player2 = Player('Paul', 'o');

render(Gameboard.displayBoard());

Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 0);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 2);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 3);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 8);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 6);
console.log(Gameboard.displayBoard());
console.log(Gameboard.checkWinner());