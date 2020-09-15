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

  test('It should return false if there is still empty spaces in the gameboard', () => {
    const gameboard = Array(9).fill('');
    expect(GameManager.endGame(gameboard)).toBe(false);
  });

  test('It should add the created players to playersList', () => {
    const players = [first, second];
    expect(GameManager.getPlayers()).toEqual(players);
  });

  test('It should return the added players to playersList', () => {
    const players = [first, second];
    expect(GameManager.getPlayers()).toEqual(players);
  });

  test('It should return the first player if the turnX value is true', () => {
    expect(GameManager.getTurn(first, second)).toEqual(first);
  });

  test('It should return the second player if the turnX value is false', () => {
    GameManager.changeTurn();
    expect(GameManager.getTurn(first, second)).toEqual(second);
  });
});