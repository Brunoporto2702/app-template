import Email from 'src/common/core/types/email';

export default class SendEmailCommand {
  constructor(
    public to: Email[],
    public body: string,
    public subject: string,
    public cc?: Email[],
  ) {}
}
