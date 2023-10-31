import { NotificationService } from 'src/utility-modules/notification/domain/services/notification.service';
import { SqlContactRepository } from 'src/utility-modules/notification/infra/data/repositories/sql-contact.repository';
import { SqlEmailRepository } from 'src/utility-modules/notification/infra/data/repositories/sql-email.repository';
import { INestApplication } from '@nestjs/common';
import SendEmailCommand from 'src/utility-modules/notification/domain/command/send-email.command';
import NewLeadTemplate, {
  NewLeadTemplateData,
} from 'src/app/domain/models/email-templates/new-lead.template';
import Email from 'src/common/core/types/email';
import { AuthService } from 'src/utility-modules/auth/domain/services/auth.service';
import CreateUserCommand from 'src/utility-modules/auth/domain/commands/create-user.command';
import EmailSentEvent from 'src/utility-modules/notification/domain/events/email-sent.event';
import initializeTestApp from '../helpers/fixtures/app-initializer';
import EmailSentEventHandler from 'src/utility-modules/notification/domain/events/handlers/email-sent.handler';

describe('Notification Service', () => {
  let emailRepository: SqlEmailRepository;
  let notificationService: NotificationService;
  let authService: AuthService;
  let eventBusMock: jest.SpyInstance;
  let emailSentEventHandler: EmailSentEventHandler;
  let app: INestApplication;
  let contactRepository: SqlContactRepository;

  beforeEach(async () => {
    const initializedApp = await initializeTestApp();
    app = initializedApp.app;
    const module = initializedApp.module;
    eventBusMock = initializedApp.eventBusMock;
    authService = module.get<AuthService>(AuthService);
    notificationService = module.get<NotificationService>(NotificationService);
    emailRepository = module.get<SqlEmailRepository>(SqlEmailRepository);
    contactRepository = module.get<SqlContactRepository>(SqlContactRepository);
    emailSentEventHandler = module.get<EmailSentEventHandler>(
      EmailSentEventHandler,
    );
  });

  afterEach(async () => {
    await app.close();
  }, 3000);

  it('should be defined', () => {
    expect(notificationService).toBeDefined();
  });

  it('should create a new email in db with sent status, when a new email is sent', async () => {
    // arrange
    const emailBody: NewLeadTemplateData = {
      name: 'Teste',
      email: 'johndoe@test.com',
      role: 'Worker',
      company: 'Any company',
      message: 'This is a test message',
    };

    const newLeadTemplate = new NewLeadTemplate(emailBody);

    const sendEmailCommand = new SendEmailCommand(
      [Email.create('contat@your-domain.com')],
      newLeadTemplate.getSubject(),
      newLeadTemplate.getBody(),
    );
    await notificationService.sendEmail(sendEmailCommand);

    const email = await emailRepository.getByExternalId(
      '0a5edb04-6fea-4b00-96f2-55a773a4576c',
    );

    expect(email).toHaveProperty('externalId', email?.externalId);
    expect(email).toHaveProperty('status', 'SENT');
  });

  it('should publish EmailSentEvent for each email on the To list of the sent email', async () => {
    // arrange
    const sendEmailCommand = new SendEmailCommand(
      [Email.create('1@email.com'), Email.create('2@email.com')],
      'body',
      'subject',
    );

    // act
    await notificationService.sendEmail(sendEmailCommand);

    // assert
    const events = sendEmailCommand.to.map((email) => {
      return new EmailSentEvent(email);
    });

    expect(eventBusMock).toHaveBeenCalledTimes(2);

    expect(eventBusMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        email: events[0].email,
      }),
    );

    expect(eventBusMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        email: events[1].email,
      }),
    );
  });

  it('should create a new contact', async () => {
    // arrange
    const emailSentEvent = new EmailSentEvent(Email.create('email@email.com'));

    // act
    await emailSentEventHandler.onHandle(emailSentEvent);

    // assert
    const newContact = await contactRepository.getPreviousContact(
      emailSentEvent.email,
    );

    expect(newContact).toMatchObject({
      email: emailSentEvent.email,
      active: true,
      createdAt: expect.any(Date),
      userId: null,
    });
  });

  it('should create a new contact and use the corresponding user id, if that email has been already registered as a user email', async () => {
    // arrange
    // create user
    const user = {
      email: 'some@gmail.com',
      roles: ['user'],
    };

    const createdUser = await authService.createUser(user as CreateUserCommand);

    // create contact with the same email
    // arrange
    const emailSentEvent = new EmailSentEvent(Email.create(user.email));

    // act
    await emailSentEventHandler.onHandle(emailSentEvent);

    // assert
    const newContact = await contactRepository.getPreviousContact(
      emailSentEvent.email,
    );

    expect(newContact).toHaveProperty('userId', createdUser.id);
  });
});
