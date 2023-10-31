import InvalidInputException from 'src/common/core/exceptions/invalid-input.exception';

export const CPF_REGEX = /^(?:(?:\d{3}\.){2}\d{3}-\d{2})|^\d{11}$/;

export default class Cpf {
  private constructor(cpf: string) {
    this.value = cpf;
  }

  value: string;

  static create(cpf: string) {
    if (!Cpf.validate(cpf)) {
      throw new InvalidInputException(
        'invalid CPF',
        'try including a valid CPF',
      );
    }

    return new Cpf(cpf);
  }

  static validate(cpf: string): boolean {
    return CPF_REGEX.test(cpf);
  }
}
