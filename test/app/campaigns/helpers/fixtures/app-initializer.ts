import { INestApplication, ValidationPipe } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { Role } from 'src/common/core/types/role';
import EmailSender from 'src/utility-modules/notification/domain/interfaces/email/email.sender';
import { NotificationService } from 'src/utility-modules/notification/domain/services/notification.service';
import ResendSenderMock from 'test/utility-modules/notification/helpers/ResendSenderMock';
import { appFixture } from 'src/app/app.module';

const testAppFixture = {
  ...appFixture,
  providers: [
    ...appFixture.providers,
    {
      provide: EmailSender,
      useClass: ResendSenderMock,
    },
  ],
};

export default async function initializeTestApp(): Promise<{
  module: TestingModule;
  app: INestApplication;
  eventBusMock: jest.SpyInstance;
  notificationServiceMock: jest.SpyInstance;
  adminToken: string;
  userToken: string;
}> {
  const module: TestingModule = await Test.createTestingModule(
    testAppFixture,
  ).compile();

  const app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  const eventBus = module.get<EventBus>(EventBus);
  const eventBusMock = jest
    .spyOn(eventBus, 'publish')
    .mockImplementation(() => true);

  const notificationService =
    module.get<NotificationService>(NotificationService);
  const notificationServiceMock = jest
    .spyOn(notificationService, 'sendEmail')
    .mockImplementation(async () => true);

  const payload = {
    userId: randomUUID(),
    email: 'email@admin.com',
    roles: [Role.Admin],
  };
  const jwtService = module.get<JwtService>(JwtService);
  const adminToken = await jwtService.signAsync(payload);

  const userPayload = {
    userId: randomUUID(),
    email: 'email@user.com',
    roles: [Role.User],
  };
  const userToken = await jwtService.signAsync(userPayload);

  return {
    app,
    module,
    eventBusMock,
    notificationServiceMock,
    adminToken,
    userToken,
  };
}
