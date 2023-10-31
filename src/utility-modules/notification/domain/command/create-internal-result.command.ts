export default class CreateInternalResultCommand {
  constructor(
    public WinnerEmail: string,
    public isWinner: boolean,
    public campaignName?: string,
    public companyName?: string,
    public prize?: string,
    public pixKey?: string,
    public WinnerName?: string,
  ) {}
}
