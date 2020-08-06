const GameManager = (() => {
  let turnX = false;
  const playersList = Array(2);
  return {
    changeTurn(player1, player2) {
      turnX = !turnX;
      return turnX ? player1.getPiece() : player2.getPiece();
    },
    restartTurn() {
      turnX = false;
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

function verifyNames(game) {
  // eslint-disable-next-line no-undef
  $('.ui.form').form({
    fields: {
      playerone: {
        identifier: 'player1-name',
        rules: [
          {
            type: 'minLength[4]',
            prompt: 'The name must be at least {ruleValue} characters long.',
          },
        ],
      },
      playertwo: {
        identifier: 'player2-name',
        rules: [
          {
            type: 'minLength[4]',
            prompt: 'The name must be at least {ruleValue} characters long.',
          },
          {
            type: 'different[player1-name]',
            prompt: 'The name should be different to the player one.',
          },
        ],
      },
    },
    onSuccess(event) {
      event.preventDefault();
      const values = getInputNames();
      if (typeof values === 'object') {
        createPlayers(...values, game);
        displayStatus(game.getPlayers());
        clearInputs();
      }
    },
  });
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
  });
}

function addPlaceMove(gameboard, gamemanager) {
  const btn = document.querySelectorAll('.board-cell');
  for (let i = 0; i < btn.length; i += 1) {
    // eslint-disable-next-line no-loop-func
    btn[i].addEventListener('click', (e) => {
      const piece = gamemanager.changeTurn(...gamemanager.getPlayers());
      gameboard.changeBoard(piece, e.target.id);
      render(gameboard.displayBoard());
      const players = gamemanager.getPlayers();
      const winner = gameboard.checkWinner(players, piece);
      if (winner) {
        document.getElementsByClassName('winner-content')[0].innerHTML = `${winner.getName()} has won!`;
        // eslint-disable-next-line no-undef
        $('.winner').modal('show');
        gameboard.clearBoard();
        winner.updateScore();
        displayStatus(players);
        gamemanager.restartTurn();
      }
    });
  }
}

function cancelButton() {
  const btn = document.getElementById('cancelBtn');
  btn.addEventListener('click', () => {
    clearInputs();
  });
}

function submitButton(game) {
  const btn = document.getElementById('submitBtn');
  btn.addEventListener('click', () => {
    verifyNames(game);
  });
}

addButtonStart();
addButtonRestart(Gameboard, GameManager);
addPlaceMove(Gameboard, GameManager);
cancelButton();
submitButton(GameManager);