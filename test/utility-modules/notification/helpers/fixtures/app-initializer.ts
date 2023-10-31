import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/utility-modules/auth/domain/services/auth.service';
import { SqlUserRepository } from 'src/utility-modules/auth/infra/data/repositories/sql-user-repository';
import configuration from 'src/configuration/configuration';
import { DbModule } from 'src/utility-modules/data/db/db.module';
import EmailSender from 'src/utility-modules/notification/domain/interfaces/email/email.sender';
import { NotificationService } from 'src/utility-modules/notification/domain/services/notification.service';
import { SqlContactRepository } from 'src/utility-modules/notification/infra/data/repositories/sql-contact.repository';
import { SqlEmailRepository } from 'src/utility-modules/notification/infra/data/repositories/sql-email.repository';
import { NotificationController } from 'src/utility-modules/notification/interactors/http/notification.controller';
import ResendSenderMock from '../ResendSenderMock';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { Role } from 'src/common/core/types/role';
import { BusModule } from 'src/utility-modules/bus/bus.module';
import { events } from 'src/utility-modules/notification/notification.module';

const appFixutre = {
  imports: [
    DbModule,
    ConfigModule.forRoot({ load: [configuration] }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    BusModule,
  ],
  exports: [NotificationService],
  controllers: [NotificationController],
  providers: [
    AuthService,
    SqlEmailRepository,
    SqlUserRepository,
    SqlContactRepository,
    NotificationService,
    ...events,
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
  adminToken: string;
  userToken: string;
}> {
  const module: TestingModule = await Test.createTestingModule(
    appFixutre,
  ).compile();

  const app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  const eventBus = module.get<EventBus>(EventBus);
  const eventBusMock = jest
    .spyOn(eventBus, 'publish')
    .mockImplementation(() => true);

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
    adminToken,
    userToken,
  };
}
