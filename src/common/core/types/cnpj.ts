import InvalidInputException from 'src/common/core/exceptions/invalid-input.exception';

export const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

export default class Cnpj {
  private constructor(cnpj: string) {
    this.value = cnpj;
  }

  value: string;

  static create(cnpj: string) {
    if (!Cnpj.validate(cnpj)) {
      throw new InvalidInputException(
        'invalid cnpj',
        'try including a valid cnpj',
      );
    }

    return new Cnpj(cnpj);
  }

  static validate(cnpj: string): boolean {
    return CNPJ_REGEX.test(cnpj);
  }
}
