import DomainException from './domain-exception';

export default class InvalidInputException extends DomainException {
  constructor(message: string, responseMessage?: string) {
    super(message, 2, 400, responseMessage);
  }
}
