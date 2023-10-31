import BaseEventHandler from 'src/utility-modules/bus/domain/base-classes/handler-wrapper';
import EmailSentEvent from '../email-sent.event';
import { EventsHandler } from '@nestjs/cqrs';
import { IEventExecutionRepository } from 'src/utility-modules/bus/domain/interfaces/i-execution-repository';
import { Inject } from '@nestjs/common';
import { SqlContactRepository } from 'src/utility-modules/notification/infra/data/repositories/sql-contact.repository';
import { SqlUserRepository } from 'src/utility-modules/auth/infra/data/repositories/sql-user-repository';
import { Contact } from '../../models/contact';

@EventsHandler(EmailSentEvent)
export default class EmailSentEventHandler extends BaseEventHandler<EmailSentEvent> {
  constructor(
    @Inject(IEventExecutionRepository)
    readonly eventExecutionRepository: IEventExecutionRepository,
    @Inject(SqlContactRepository)
    readonly contactRepository: SqlContactRepository,
    @Inject(SqlUserRepository)
    readonly userRepository: SqlUserRepository,
  ) {
    super();
  }
  async onHandle(event: EmailSentEvent): Promise<void> {
    /// check if contact with this email already exists
    const contactAlreadyExists =
      await this.contactRepository.getPreviousContact(event.email);
    if (contactAlreadyExists) return;

    // check if there's a user with this email in db and get its id
    const userAlreadyExists = await this.userRepository.findByEmail(
      event.email.value,
    );

    const newContact = Contact.create(event.email, true, userAlreadyExists?.id);

    await this.contactRepository.insert(newContact);
  }
}
