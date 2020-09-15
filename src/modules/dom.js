import { Gameboard, createPlayers } from './logic';
import playerOneImg from '../assets/images/player1.png';
import playerTwoImg from '../assets/images/player2.png';

const clearBoard = () => {
  const gameboard = Gameboard.displayBoard();
  gameboard.fill('');
  const board = document.querySelectorAll('.board-cell');
  for (let i = 0; i < gameboard.length; i += 1) {
    board[i].style.backgroundImage = 'none';
  }
};

const clearInputs = () => {
  const textValues = document.querySelectorAll('.values');
  textValues.forEach(element => {
    element.value = '';
  });
};

const getInputNames = () => {
  const player1Input = document.getElementById('player1-name').value;
  const player2Input = document.getElementById('player2-name').value;
  return [player1Input, player2Input];
};

const displayStatus = (players) => {
  for (let i = 0; i < 2; i += 1) {
    document.getElementsByClassName(`player${i + 1}-body`)[0].innerHTML = players[i].getName();
    document.getElementsByClassName(`player${i + 1}-body`)[1].innerHTML = players[i].getScore();
  }
};

const displayTurn = (game) => {
  const player = game.getTurn(...game.getPlayers());
  document.getElementsByClassName('player-turn-content')[0].innerHTML = `${player.getName()} it's your turn`;
};

const render = (gameboard) => {
  const board = document.querySelectorAll('.board-cell');
  for (let i = 0; i < gameboard.length; i += 1) {
    if (gameboard[i] === 'x') {
      board[i].style.backgroundImage = `url('${playerOneImg}')`;
      board[i].style.backgroundRepeat = 'no-repeat';
      board[i].style.backgroundPosition = 'center';
    }
    if (gameboard[i] === 'o') {
      board[i].style.backgroundImage = `url('${playerTwoImg}')`;
      board[i].style.backgroundRepeat = 'no-repeat';
      board[i].style.backgroundPosition = 'center';
    }
  }
};

const addButtonStart = () => {
  const btn = document.getElementById('start-button');
  btn.addEventListener('click', () => {
    // eslint-disable-next-line no-undef
    $('.add-players').modal('show');
  });
};

const addButtonRestart = (gamemanager) => {
  const btn = document.getElementById('restart-button');
  btn.addEventListener('click', () => {
    clearBoard();
    gamemanager.restartTurn();
    displayTurn(gamemanager);
  });
};

const addPlaceMove = (gameboard, gamemanager) => {
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
          clearBoard();
          winner.updateScore();
          displayStatus(players);
          gamemanager.restartTurn();
          displayTurn(gamemanager);
        } else {
          // eslint-disable-next-line no-lonely-if
          if (!turnsLeft) {
            // eslint-disable-next-line no-undef
            $('.end-game').modal('show');
            clearBoard();
            gamemanager.restartTurn();
            displayTurn(gamemanager);
          }
        }
      }
    });
  }
};

const cancelButton = () => {
  const btn = document.getElementById('cancelBtn');
  btn.addEventListener('click', () => {
    clearInputs();
    // eslint-disable-next-line no-undef
    $('.mini.modal').modal('hide');
  });
};

const submitButton = (game) => {
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
};

export {
  addButtonStart, addButtonRestart, addPlaceMove, cancelButton, submitButton,
};