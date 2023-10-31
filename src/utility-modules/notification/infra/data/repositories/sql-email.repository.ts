import { Repository } from 'typeorm';
import { EmailMessageEntity } from '../entities/email-message.entity';
import { DbService } from 'src/utility-modules/data/db/db.service';
import { Inject } from '@nestjs/common';
import { EmailRepository } from 'src/utility-modules/notification/domain/interfaces/data/repositories/email.interface';
import { EmailMapper } from 'src/utility-modules/notification/mappers/email.mapper';
import { EmailMessage } from 'src/utility-modules/notification/domain/models/email-message';
import { UUID } from 'crypto';

export class SqlEmailRepository implements EmailRepository {
  emailRepository: Repository<EmailMessageEntity>;

  constructor(@Inject(DbService) private readonly db: DbService) {
    this.emailRepository = this.db.db.getRepository(EmailMessageEntity);
  }

  async insert(email: EmailMessage): Promise<EmailMessage> {
    const emailDao = EmailMapper.modelToDao(email);
    await this.emailRepository.save(emailDao);
    return EmailMapper.daoToModel(emailDao);
  }

  async update(email: EmailMessage): Promise<EmailMessage> {
    const emailDao = EmailMapper.modelToDao(email);
    await this.emailRepository.save(emailDao);
    return EmailMapper.daoToModel(emailDao);
  }

  async getByExternalId(id: UUID): Promise<EmailMessage | null> {
    const emailExists = await this.emailRepository.findOne({
      where: {
        externalId: id,
      },
    });
    return emailExists ? EmailMapper.daoToModel(emailExists) : null;
  }
}
