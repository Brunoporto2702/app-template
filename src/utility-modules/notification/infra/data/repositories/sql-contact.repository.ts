import { Repository } from 'typeorm';
import { ContactEntity } from '../entities/contact.entity';
import { DbService } from 'src/utility-modules/data/db/db.service';
import { Inject } from '@nestjs/common';
import { Contact } from 'src/utility-modules/notification/domain/models/contact';
import { ContactMapper } from 'src/utility-modules/notification/mappers/contact.mapper';
import { ContactRepository } from 'src/utility-modules/notification/domain/interfaces/data/repositories/contact.interface';
import Email from 'src/common/core/types/email';

export class SqlContactRepository implements ContactRepository {
  contactRepository: Repository<ContactEntity>;

  constructor(@Inject(DbService) private readonly db: DbService) {
    this.contactRepository = this.db.db.getRepository(ContactEntity);
  }

  async getPreviousContact(email: Email): Promise<Contact | null> {
    const contactEntity = await this.contactRepository.findOne({
      where: {
        email: email.value,
      },
    });
    return contactEntity ? ContactMapper.daoToModel(contactEntity) : null;
  }

  async insert(contact: Contact): Promise<Contact> {
    const contactDao = ContactMapper.modelToDao(contact);
    await this.contactRepository.save(contactDao);
    return ContactMapper.daoToModel(contactDao);
  }
}
