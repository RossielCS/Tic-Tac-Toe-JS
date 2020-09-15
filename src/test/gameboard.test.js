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
});
