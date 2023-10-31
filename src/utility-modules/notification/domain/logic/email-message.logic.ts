import { UUID } from 'crypto';
import { EmailMessage, EmailStatus } from '../models/email-message';

export function updateStatus(
  emailMessage: EmailMessage,
  status: EmailStatus,
): EmailMessage {
  emailMessage.status = status;
  if (status === EmailStatus.sent) {
    emailMessage.sentAt = new Date();
  }
  emailMessage.updatedAt = new Date();
  return emailMessage;
}

export function updateExternalId(
  emailMessage: EmailMessage,
  externalId: UUID,
): EmailMessage {
  emailMessage.externalId = externalId;
  emailMessage.updatedAt = new Date();
  return emailMessage;
}
