import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DbModule } from '../data/db/db.module';
import { IEventExecutionRepository } from './domain/interfaces/i-execution-repository';
import { SqlEventExecutionRepository } from './infra/data/repositories/sql-event-execution.repository';

@Module({
  imports: [CqrsModule, DbModule],
  providers: [
    {
      provide: IEventExecutionRepository,
      useClass: SqlEventExecutionRepository,
    },
  ],
  exports: [CqrsModule, IEventExecutionRepository],
})
export class BusModule {}
