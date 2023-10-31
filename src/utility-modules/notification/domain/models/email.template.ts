export default abstract class EmailTemplate<T = any> {
  constructor(public data: T) {}
  abstract getBody(): string;
  abstract getSubject(): string;
}
