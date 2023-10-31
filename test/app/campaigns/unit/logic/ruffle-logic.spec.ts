import RuffleLogic from '../../../../../src/app/domain/logic/ruffle/ruffle-logic';

// test PossibleNumbers function
describe('RuffleLogic', () => {
  it('should return an array of numbers from 1 to 5', () => {
    expect(RuffleLogic.PossibleNumbers(5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return an array of numbers from 1 to 10', () => {
    expect(RuffleLogic.PossibleNumbers(10)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  // test AvailableNumbers function
  it('should return an array of numbers from 1 to 5', () => {
    expect(RuffleLogic.AvailableNumbers([1, 2, 3, 4, 5], [])).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  it('should return an array with correct numbers', () => {
    expect(RuffleLogic.AvailableNumbers([1, 2, 3, 4, 5], [1])).toEqual([
      2, 3, 4, 5,
    ]);
    expect(RuffleLogic.AvailableNumbers([1, 2, 3, 4, 5], [1, 2, 3, 4])).toEqual(
      [5],
    );
    expect(
      RuffleLogic.AvailableNumbers([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]),
    ).toEqual([]);
    expect(
      RuffleLogic.AvailableNumbers([1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6]),
    ).toEqual([]);
  });

  // test DrawNumber function
  it('should return 0', () => {
    expect(RuffleLogic.DrawNumber([], 0)).toEqual(0);
  });

  it('should return 1', () => {
    expect(RuffleLogic.DrawNumber([1], 0)).toEqual(1);
  });

  it('should return 2', () => {
    expect(RuffleLogic.DrawNumber([1, 2], 0.5)).toEqual(2);
  });

  it('should return 2', () => {
    expect(RuffleLogic.DrawNumber([1, 2, 3], 0.6)).toEqual(2);
  });

  // test IsWinner function
  it('should return true', () => {
    expect(RuffleLogic.IsWinner(1, 1)).toEqual(true);
    expect(RuffleLogic.IsWinner(1, 2)).toEqual(true);
    expect(RuffleLogic.IsWinner(2, 2)).toEqual(true);
    expect(RuffleLogic.IsWinner(2, 3)).toEqual(true);
  });

  it('should return false', () => {
    expect(RuffleLogic.IsWinner(-1, 0)).toEqual(false);
    expect(RuffleLogic.IsWinner(0, 0)).toEqual(false);
    expect(RuffleLogic.IsWinner(0, 1)).toEqual(false);
    expect(RuffleLogic.IsWinner(2, 1)).toEqual(false);
    expect(RuffleLogic.IsWinner(3, 2)).toEqual(false);
  });
});
