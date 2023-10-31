import { UUID } from 'crypto';
import Email from 'src/common/core/types/email';
import { v4 as uuidv4 } from 'uuid';

export enum EmailStatus {
  sent = 'SENT',
  delivered = 'DELIVERED',
  delivered_delayed = 'DELIVERY_DELAYED',
  complained = 'COMPLAINED',
  bounced = 'BOUNCED',
  opened = 'OPENED',
  clicked = 'CLICKED',
  created = 'CREATED',
}

export class EmailMessage {
  private constructor(
    to: Email[],
    from: Email,
    body: string,
    subject: string,
    id: UUID,
    cc?: Email[],
  ) {
    this.to = to;
    this.from = from;
    this.body = body;
    this.subject = subject;
    this.cc = cc;
    this.createdAt = new Date();
    this.id = id;
    this.status = EmailStatus.created;
  }

  id: UUID;
  status: EmailStatus;
  createdAt: Date;
  to: Email[];
  from: Email;
  body: string;
  subject: string;
  sentAt?: Date;
  updatedAt?: Date;
  externalId?: UUID;
  cc?: Email[];

  static create(
    to: Email[],
    from: Email,
    body: string,
    subject: string,
    cc?: Email[],
    id?: UUID,
  ) {
    id = id ? id : (uuidv4() as UUID);
    return new EmailMessage(to, from, body, subject, id, cc);
  }
}
