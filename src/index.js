import './assets/stylesheets/style.scss';

const GameManager = (() => {
  let turnX = true;
  const playersList = Array(2);
  return {
    changeTurn(player1, player2) {
      turnX = !turnX;
      const player = turnX ? player2 : player1;
      return player.getPiece();
    },
    restartTurn() {
      turnX = true;
    },
    endGame(gameboard) {
      const checked = !gameboard.some(x => x === '');
      return checked;
    },
    addPlayers(player1, player2) {
      playersList[0] = player1;
      playersList[1] = player2;
    },
    getPlayers() {
      return playersList;
    },
    getTurn(player1, player2) {
      return turnX ? player1 : player2;
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
      const board = document.querySelectorAll('.board-cell');
      for (let i = 0; i < gameboard.length; i += 1) {
        board[i].style.backgroundImage = 'none';
      }
    },
    checkWinner(playersList, piece) {
      const winningK = Object.keys(winningCombinations);
      for (let i = 0; i < winningK.length; i += 1) {
        if (winningCombinations[i + 1].every(a => gameboard[a] === piece)) {
          const winner = playersList.find(x => x.getPiece() === piece);
          return winner;
        }
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

function createPlayers(player1, player2, game) {
  const first = Player(player1, 'x');
  const second = Player(player2, 'o');
  game.addPlayers(first, second);
}

function clearInputs() {
  const textValues = document.querySelectorAll('.values');
  textValues.forEach(element => {
    element.value = '';
  });
}

function getInputNames() {
  const player1Input = document.getElementById('player1-name').value;
  const player2Input = document.getElementById('player2-name').value;
  return [player1Input, player2Input];
}

function displayStatus(players) {
  for (let i = 0; i < 2; i += 1) {
    document.getElementsByClassName(`player${i + 1}-body`)[0].innerHTML = players[i].getName();
    document.getElementsByClassName(`player${i + 1}-body`)[1].innerHTML = players[i].getScore();
  }
}

function displayTurn(game) {
  const player = game.getTurn(...game.getPlayers());
  document.getElementsByClassName('player-turn-content')[0].innerHTML = `${player.getName()} is your turn`;
}

function render(gameboard) {
  const board = document.querySelectorAll('.board-cell');
  for (let i = 0; i < gameboard.length; i += 1) {
    if (gameboard[i] === 'x') {
      board[i].style.backgroundImage = "url('assets/images/player1.png')";
      board[i].style.backgroundRepeat = 'no-repeat';
      board[i].style.backgroundPosition = 'center';
    }
    if (gameboard[i] === 'o') {
      board[i].style.backgroundImage = "url('assets/images/player2.png')";
      board[i].style.backgroundRepeat = 'no-repeat';
      board[i].style.backgroundPosition = 'center';
    }
  }
}

function addButtonStart() {
  const btn = document.getElementById('start-button');
  btn.addEventListener('click', () => {
    // eslint-disable-next-line no-undef
    $('.add-players').modal('show');
  });
}

function addButtonRestart(gameboard, gamemanager) {
  const btn = document.getElementById('restart-button');
  btn.addEventListener('click', () => {
    gameboard.clearBoard();
    gamemanager.restartTurn();
    displayTurn(gamemanager);
  });
}

function addPlaceMove(gameboard, gamemanager) {
  const btn = document.querySelectorAll('.board-cell');
  for (let i = 0; i < btn.length; i += 1) {
    // eslint-disable-next-line no-loop-func
    btn[i].addEventListener('click', (e) => {
      const players = gamemanager.getPlayers();
      const piece = gamemanager.getTurn(...players).getPiece();
      const change = gameboard.changeBoard(piece, e.target.id);
      if (change) {
        render(gameboard.displayBoard());
        gamemanager.changeTurn(...players);
        displayTurn(gamemanager);
        const winner = gameboard.checkWinner(players, piece);
        const turnsLeft = gameboard.displayBoard().filter(x => x === '').length;
        if (winner) {
          document.getElementsByClassName('winner-content')[0].innerHTML = `${winner.getName()} has won!`;
          // eslint-disable-next-line no-undef
          $('.winner').modal('show');
          gameboard.clearBoard();
          winner.updateScore();
          displayStatus(players);
          gamemanager.restartTurn();
          displayTurn(gamemanager);
        } else {
          // eslint-disable-next-line no-lonely-if
          if (!turnsLeft) {
            // eslint-disable-next-line no-undef
            $('.end-game').modal('show');
            gameboard.clearBoard();
            gamemanager.restartTurn();
            displayTurn(gamemanager);
          }
        }
      }
    });
  }
}

function cancelButton() {
  const btn = document.getElementById('cancelBtn');
  btn.addEventListener('click', () => {
    clearInputs();
    // eslint-disable-next-line no-undef
    $('.mini.modal').modal('hide');
  });
}

function submitButton(game) {
  const btn = document.getElementById('submitBtn');
  btn.addEventListener('click', () => {
    const inputValues = document.getElementsByClassName('values');
    if (inputValues[0].value.toLowerCase() === inputValues[1].value.toLowerCase()) {
      inputValues[1].setCustomValidity('The players\' names must be different.');
    } else {
      inputValues[1].setCustomValidity('');
      if (inputValues[0].checkValidity() && inputValues[1].checkValidity()) {
        const names = getInputNames();
        const players = game.getPlayers();
        createPlayers(...names, game);
        displayStatus(players);
        clearInputs();
        // eslint-disable-next-line no-undef
        $('.mini.modal').modal('hide');
        document.getElementsByClassName('cover-gameboard')[0].style.visibility = 'hidden';
        displayTurn(game);
      }
    }
  });
}

addButtonStart();
addButtonRestart(Gameboard, GameManager);
addPlaceMove(Gameboard, GameManager);
cancelButton();
submitButton(GameManager);