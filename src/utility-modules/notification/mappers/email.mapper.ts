import Email from 'src/common/core/types/email';
import { EmailMessage } from '../domain/models/email-message';
import { EmailMessageEntity } from '../infra/data/entities/email-message.entity';

export class EmailMapper {
  static modelToDao(email: EmailMessage): EmailMessageEntity {
    return {
      from: email.from.value,
      body: email.body,
      id: email.id,
      createdAt: email.createdAt,
      status: email.status,
      cc: email.cc?.map((cc) => cc.value),
      externalId: email.externalId,
      subject: email.subject,
      to: email.to.map((to) => to.value),
      updatedAt: email.updatedAt,
    };
  }

  static daoToModel(emailDao: EmailMessageEntity): EmailMessage {
    return {
      body: emailDao.body,
      id: emailDao.id,
      createdAt: emailDao.createdAt,
      cc: emailDao.cc?.map((cc) => Email.create(cc)),
      externalId: emailDao.externalId ? emailDao.externalId : undefined,
      status: emailDao.status,
      subject: emailDao.subject,
      to: emailDao.to.map((to) => Email.create(to)),
      from: Email.create(emailDao.from),
      updatedAt: emailDao.updatedAt,
    };
  }
}
