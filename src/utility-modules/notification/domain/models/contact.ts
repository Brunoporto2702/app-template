import { UUID } from 'crypto';
import Email from 'src/common/core/types/email';

export class Contact {
  private constructor(email: Email, active: boolean, userId?: UUID) {
    this.email = email;
    this.active = active;
    this.createdAt = new Date();
    this.userId = userId;
  }

  email: Email;
  active: boolean;
  createdAt: Date;
  userId?: UUID;

  static create(email: Email, active: boolean, userId?: UUID) {
    return new Contact(email, active, userId);
  }
}
