import { GameManager, Player } from '../modules/logic';

describe('GameManager', () => {
  const first = Player('Ana', 'x');
  const second = Player('Paul', 'o');
  GameManager.addPlayers(first, second);

  test('It should change turn\'s value', () => {
    expect(GameManager.changeTurn()).toBe(false);
  });

  test('It should change turn\'s value to true', () => {
    GameManager.changeTurn();
    expect(GameManager.restartTurn()).toBe(true);
  });

  test('It should return true if there is no more empty spaces in the gameboard', () => {
    const gameboard = Array(9).fill('x');
    expect(GameManager.endGame(gameboard)).toBe(true);
  });
});