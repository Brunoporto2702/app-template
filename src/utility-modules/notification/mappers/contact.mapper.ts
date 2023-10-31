import Email from 'src/common/core/types/email';
import { Contact } from '../domain/models/contact';
import { ContactEntity } from '../infra/data/entities/contact.entity';

export class ContactMapper {
  static modelToDao(contact: Contact): ContactEntity {
    return {
      email: contact.email.value,
      active: contact.active,
      createdAt: contact.createdAt,
      userId: contact.userId,
    };
  }

  static daoToModel(contactDao: ContactEntity): Contact {
    return {
      email: Email.create(contactDao.email),
      active: contactDao.active,
      createdAt: contactDao.createdAt,
      userId: contactDao.userId,
    };
  }
}
