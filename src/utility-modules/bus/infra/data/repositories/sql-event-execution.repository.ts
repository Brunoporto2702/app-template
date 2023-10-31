import { Inject } from '@nestjs/common';
import { IEventExecutionRepository } from 'src/utility-modules/bus/domain/interfaces/i-execution-repository';
import EventExecution from 'src/utility-modules/bus/domain/models/event-execution.model';
import { DbService } from 'src/utility-modules/data/db/db.service';
import { Repository } from 'typeorm';
import { EventExecutionEntity } from '../entities/event-execution.entity';
import { UUID } from 'crypto';
import { EventExecutionMapper } from 'src/utility-modules/bus/mappers/event-execution.mapper';

export class SqlEventExecutionRepository extends IEventExecutionRepository {
  readonly eventExecutionRepository: Repository<EventExecutionEntity>;
  constructor(@Inject(DbService) private readonly db: DbService) {
    super();
    this.eventExecutionRepository =
      this.db.db.getRepository(EventExecutionEntity);
  }

  async insert(eventExecution: EventExecution): Promise<EventExecution> {
    const eventExecutionDao = EventExecutionMapper.modelToDao(eventExecution);
    const eventExecutionSaved = await this.eventExecutionRepository.save(
      eventExecutionDao,
    );
    return EventExecutionMapper.daoToModel(eventExecutionSaved);
  }
  async findById(id: UUID): Promise<EventExecution | null> {
    if (!id) return null;

    const eventExecutionExists = await this.eventExecutionRepository.findOne({
      where: {
        id: id,
      },
    });
    return eventExecutionExists
      ? EventExecutionMapper.daoToModel(eventExecutionExists)
      : null;
  }
  async update(eventExecution: EventExecution): Promise<EventExecution | null> {
    const eventExecutionDao = EventExecutionMapper.modelToDao(eventExecution);
    const eventExecutionUpdated = await this.eventExecutionRepository.save(
      eventExecutionDao,
    );
    return EventExecutionMapper.daoToModel(eventExecutionUpdated);
  }
}
