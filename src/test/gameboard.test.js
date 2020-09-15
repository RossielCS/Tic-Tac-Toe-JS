import { Gameboard, Player } from '../modules/logic';

describe('Gameboard', () => {
  const first = Player('Ana', 'x');
  const second = Player('Paul', 'o');

  test('It returns true if could change gameboard element value', () => {
    expect(Gameboard.changeBoard('x', 0)).toBe(true);
  });

  test('It returns false if couldn\'t change gameboard element value', () => {
    Gameboard.displayBoard().fill('x');
    expect(Gameboard.changeBoard('x', 0)).toBe(false);
  });

  test('It returns the gameboard', () => {
    const fakeBoard = Array(9).fill('x');
    expect(Gameboard.displayBoard()).toEqual(fakeBoard);
  });

  test('It returns the first player if is the winner', () => {
    expect(Gameboard.checkWinner([first, second], 'x')).toBe(first);
  });

  test('It returns the player who won if there is a winner', () => {
    Gameboard.displayBoard().fill('o');
    expect(Gameboard.checkWinner([first, second], 'o')).toBe(second);
  });

  test('It returns false if there isn\'t a winner', () => {
    Gameboard.displayBoard().fill('');
    expect(Gameboard.checkWinner([first, second], 'x')).toBe(false);
  });
});
