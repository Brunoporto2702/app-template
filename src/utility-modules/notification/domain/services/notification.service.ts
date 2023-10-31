import { Resend } from 'resend';
import { EmailMessage, EmailStatus } from '../models/email-message';
import { Inject, Injectable } from '@nestjs/common';
import { SqlEmailRepository } from '../../infra/data/repositories/sql-email.repository';
import EmailSender from '../interfaces/email/email.sender';
import SendEmailCommand from '../command/send-email.command';
import { ConfigService } from '@nestjs/config';
import Email from 'src/common/core/types/email';
import * as EmailMessageLogic from '../logic/email-message.logic';
import CreateContactCommand from '../command/create-contact.command';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class NotificationService {
  private readonly resend: Resend;

  constructor(
    @Inject(SqlEmailRepository)
    private readonly emailRepository: SqlEmailRepository,
    @Inject(EmailSender)
    private readonly emailSender: EmailSender,
    private readonly configService: ConfigService,
    @Inject(EventBus)
    private eventBus: EventBus,
  ) {
    this.resend = new Resend(process.env.RESEND);
  }

  async sendEmail(sendEmailCommand: SendEmailCommand): Promise<any> {
    const emailMessage = EmailMessage.create(
      sendEmailCommand.to,
      Email.create(
        this.configService.get<string>('FROM_EMAIL') ||
          'contat@your-domain.com',
      ),
      sendEmailCommand.body,
      sendEmailCommand.subject,
      sendEmailCommand.cc,
    );

    await this.emailRepository.insert(emailMessage);

    const response = await this.emailSender.send(emailMessage);

    EmailMessageLogic.updateStatus(emailMessage, EmailStatus.sent);
    EmailMessageLogic.updateExternalId(emailMessage, response.id);
    await this.emailRepository.update(emailMessage);

    if (emailMessage.status === 'SENT') {
      sendEmailCommand.to.forEach((email) => {
        this.eventBus.publish(new CreateContactCommand(email, true, undefined));
      });
    }
  }
}
