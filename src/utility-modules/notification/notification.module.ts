import { Module } from '@nestjs/common';
import { DbModule } from '../data/db/db.module';
import { NotificationController } from './interactors/http/notification.controller';
import { SqlEmailRepository } from './infra/data/repositories/sql-email.repository';
import { SqlContactRepository } from './infra/data/repositories/sql-contact.repository';
import { NotificationService } from './domain/services/notification.service';
import EmailSender from './domain/interfaces/email/email.sender';
import ResendSender from './infra/email/resend.sender';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configuration/configuration';
import { SqlUserRepository } from 'src/utility-modules/auth/infra/data/repositories/sql-user-repository';
import { BusModule } from '../bus/bus.module';
import EmailSentEventHandler from './domain/events/handlers/email-sent.handler';

export const events = [EmailSentEventHandler];

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({ load: [configuration] }),
    BusModule,
  ],
  exports: [NotificationService],
  controllers: [NotificationController],
  providers: [
    SqlEmailRepository,
    SqlContactRepository,
    SqlUserRepository,
    NotificationService,
    ...events,
    {
      provide: EmailSender,
      useClass: ResendSender,
    },
  ],
})
export class NotificationModule {}
