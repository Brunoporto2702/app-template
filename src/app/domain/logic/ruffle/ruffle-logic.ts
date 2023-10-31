export default class RuffleLogic {
  static PossibleNumbers(productCount: number): number[] {
    const possibleNumbers: number[] = [];
    for (let i = 1; i <= productCount; i++) {
      possibleNumbers.push(i);
    }
    return possibleNumbers;
  }

  static AvailableNumbers(
    possibleNumbers: number[],
    alreadyDrawnNumbers: number[],
  ): number[] {
    return possibleNumbers.filter((x) => !alreadyDrawnNumbers.includes(x));
  }

  static DrawNumber(
    availableNumbers: number[],
    randomSelection: number,
  ): number {
    let drawnNumber = 0;
    if (availableNumbers.length > 0) {
      const drawnIndex = Math.floor(randomSelection * availableNumbers.length);
      drawnNumber = availableNumbers[drawnIndex];
    }
    return drawnNumber;
  }

  static IsWinner(drawnNumber: number, winnerCount: number): boolean {
    return drawnNumber > 0 && drawnNumber <= winnerCount;
  }
}
