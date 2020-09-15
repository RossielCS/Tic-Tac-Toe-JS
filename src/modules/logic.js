const GameManager = (() => {
  let turnX = true;
  const playersList = Array(2);
  return {
    changeTurn() {
      turnX = !turnX;
      return turnX;
    },
    restartTurn() {
      turnX = true;
      return turnX;
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

const createPlayers = (player1, player2, game) => {
  const first = Player(player1, 'x');
  const second = Player(player2, 'o');
  game.addPlayers(first, second);
};

export {
  GameManager, Gameboard, Player, createPlayers,
};