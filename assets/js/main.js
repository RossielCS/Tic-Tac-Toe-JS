const GameManager = (() => {
  let turnX = false;
  return {
    changeTurn(player1, player2) {
      turnX = !turnX;
      return turnX ? player1.getPiece() : player2.getPiece();
    },
    endGame(gameboard) {
      const checked = !gameboard.some(x => x === '');
      return checked;
    },
  };
})();

const Gameboard = (() => {
  const gameboard = Array(9).fill('');
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
    clearBoard() {
      gameboard.fill('');
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
    updateScore() {
      score += 1;
    },
  };
};

function sumPlayersWin(winner, player1, player2) {
  if (winner) {
    if (winner === player1.getPiece()) {
      player1.updateScore();
    } else {
      player2.updateScore();
    }
  }
}

function clearInputs() {
  const textValues = document.querySelectorAll('.values');
  textValues.forEach(element => {
    element.value = '';
  });
}

function getNames() {
  const player1Input = document.getElementById('player1-name').value;
  const player1Output = document.getElementsByClassName('player1')[0];
  player1Output.innerHTML = player1Input;

  const player2Input = document.getElementById('player2-name').value;
  const player2Output = document.getElementsByClassName('player2')[0];
  player2Output.innerHTML = player2Input;
}

function addButtonStart() {
  const btn = document.getElementById('start-button');
  btn.addEventListener('click', () => {
    $('.mini.modal').modal('show');
  });
}

function addButtonRestart(gameboard) {
  const btn = document.getElementById('restart-button');
  btn.addEventListener('click', () => {
    gameboard.clearBoard();
  });
}

function cancelButton() {
  const btn = document.getElementById('cancelBtn');
  btn.addEventListener('click', () => {
    clearInputs();
    $('.mini.modal').modal('hide');
  });
}

function submitButton() {
  const btn = document.getElementById('submitBtn');
  btn.addEventListener('click', () => {
    getNames();
    $('.mini.modal').modal('hide');
  });
}

function render(gameboard) {
  const board = document.querySelectorAll('.board-cell');
  for (let i = 0; i < gameboard.length; i += 1) {
    board[i].innerHTML = gameboard[i];
  }
}

const player1 = Player('Bob', 'x');
const player2 = Player('Paul', 'o');

render(Gameboard.displayBoard());
addButtonStart();
addButtonRestart(Gameboard);
cancelButton();
submitButton();

/* Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 0);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 2);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 3);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 8);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 7);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 1);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 4);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 5);
Gameboard.changeBoard(GameManager.changeTurn(player1, player2), 6);
console.log(Gameboard.displayBoard());
console.log(GameManager.endGame(Gameboard.displayBoard()));
sumPlayersWin(Gameboard.checkWinner(), player1, player2); */

// console.log(player1.getScore());
// Gameboard.clearBoard();