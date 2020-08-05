const GameManager = (() => {
})();

const Gameboard = (() => {
  const gameboard = ['', '', '', '', '', '', '', '', ''];
  const winningCombinations = {
    1: [gameboard[0], gameboard[3], gameboard[6]],
    2: [gameboard[1], gameboard[4], gameboard[7]],
    3: [gameboard[2], gameboard[5], gameboard[8]],
    4: [gameboard[0], gameboard[1], gameboard[2]],
    5: [gameboard[3], gameboard[4], gameboard[5]],
    6: [gameboard[6], gameboard[7], gameboard[8]],
    7: [gameboard[0], gameboard[4], gameboard[8]],
    8: [gameboard[2], gameboard[4], gameboard[6]],
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

console.log(Gameboard.changeBoard('x', 2));
console.log(Gameboard.changeBoard('o', 4));
console.log(Gameboard.changeBoard('o', 2));
render(Gameboard.displayBoard());