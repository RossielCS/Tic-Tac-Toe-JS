import { Player } from '../modules/logic';

describe('Player', () => {
  const first = Player('Ana', 'x');
  const second = Player('Paul', 'o');

  test('It should create a player', () => {
    const test = Player('Bob', 'x');
    expect(test.getName()).toBe('Bob');
  });

  test('It should return the name of the player', () => {
    expect(first.getName()).toBe('Ana');
  });

  test('It should return the name of the player', () => {
    expect(second.getPiece()).toBe('o');
  });

  test('It should return the score of the player', () => {
    expect(second.getScore()).toBe(0);
  });

  test('It should increment by one the score of the player', () => {
    first.updateScore();
    expect(first.getScore()).toBe(1);
  });
});
