import { Module } from '@nestjs/common';
import { DbModule } from '../utility-modules/data/db/db.module';
import { HttpExceptionFilter } from '../common/io/filters/all-exceptions.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../common/io/interceptors/logging.interceptor';
import { AuthModule } from '../utility-modules/auth/auth.module';
import { NotificationModule } from 'src/utility-modules/notification/notification.module';
import { BusModule } from 'src/utility-modules/bus/bus.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configuration/configuration';
import { MetricsModule } from 'src/utility-modules/metrics/metrics.module';
import { EmailController } from './interactors/http/email.controller';

export const events = [];

export const filters = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
];

export const appFixture = {
  imports: [
    DbModule,
    ConfigModule.forRoot({ load: [configuration] }),
    MetricsModule,
    AuthModule,
    NotificationModule,
    BusModule,
  ],
  controllers: [EmailController],
  providers: [...events],
};

@Module({
  ...appFixture,
  providers: [...appFixture.providers, ...filters],
})
export class AppModule {}
