import EarningsCalculatorLogic from '../../../../../src/app/domain/logic/earnings-calculator.logic';

describe('should be able to calculate earnings', () => {
  it('should be able to calculate earnings', () => {
    const result = EarningsCalculatorLogic.calculateEarnings(1000, 100, 0.06, 1);
    expect(result).toMatchObject([
      { month: 1, initialAmount: 1000, endingAmount: 1104.86, interest: 5, investment: 100, interestRate: 0.00486 },
    ]);
  });
});
