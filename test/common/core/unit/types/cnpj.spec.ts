import Cnpj, { CNPJ_REGEX } from 'src/common/core/types/cnpj';

describe('Cnpj', () => {
  it('should create a valid cnpj', () => {
    const cnpj = Cnpj.create('12.345.678/0001-90');
    expect(cnpj.value).toBe('12.345.678/0001-90');
  });

  it('should throw an error when cnpj is invalid', () => {
    expect(() => Cnpj.create('12.345.678/0001-9')).toThrowError('invalid cnpj');
  });

  it('should validate a valid cnpj', () => {
    const isValid = Cnpj.validate('12.345.678/0001-90');
    expect(isValid).toBe(true);
  });

  it('should invalidate an invalid cnpj', () => {
    const isValid = Cnpj.validate('12.345.678/0001-9');
    expect(isValid).toBe(false);
  });

  it('should validate a valid cnpj with regex', () => {
    const isValid = CNPJ_REGEX.test('12.345.678/0001-90');
    expect(isValid).toBe(true);
  });

  it('should invalidate an invalid cnpj with regex', () => {
    const isValid = CNPJ_REGEX.test('12.345.678/0001-9');
    expect(isValid).toBe(false);
  });
});
