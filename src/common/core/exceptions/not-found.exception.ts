import DomainException from './domain-exception';

export default class NotFoundException extends DomainException {
  constructor(message: string, responseMessage?: string) {
    super(message, 1, 404, responseMessage);
  }
}
