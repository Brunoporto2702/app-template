import { EmailMessage } from '../../../models/email-message';

export interface EmailRepository {
  insert(email: EmailMessage): Promise<EmailMessage>;
  update(status: EmailMessage): Promise<EmailMessage>;
}
