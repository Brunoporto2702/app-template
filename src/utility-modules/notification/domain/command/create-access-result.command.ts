export default class CreateAccessResultCommand {
  constructor(
    public email: string,
    public isWinner: boolean,
    public name?: string,
  ) {}
}
