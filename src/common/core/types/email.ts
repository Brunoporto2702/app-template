import InvalidInputException from 'src/common/core/exceptions/invalid-input.exception';

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default class Email {
  private constructor(email: string) {
    this.value = email;
  }

  value: string;

  static create(email: string) {
    if (!Email.validate(email)) {
      throw new InvalidInputException(
        'invalid e-mail',
        'try including a valid e-mail',
      );
    }
    return new Email(email);
  }

  static validate(email: string): boolean {
    return EMAIL_REGEX.test(email);
  }
}
