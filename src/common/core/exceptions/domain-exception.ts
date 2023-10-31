export default abstract class DomainException extends Error {
  constructor(
    message: string,
    public readonly code: number | undefined,
    public readonly httpStatus: number | undefined,
    public readonly responseMessage: string | undefined,
  ) {
    super(message);
  }

  public getStatus(): number {
    return this.httpStatus ? this.httpStatus : 500;
  }

  public getResponse(): string {
    return this.responseMessage
      ? this.responseMessage
      : 'internal server error';
  }
}
