import { IEventHandler } from '@nestjs/cqrs';
import { IEventExecutionRepository } from '../interfaces/i-execution-repository';
import EventExecution from '../models/event-execution.model';
import BaseEvent from './base-event';
import * as EventExecutionLogic from '../logic/event-execution.logic';
import { UUID, randomUUID } from 'crypto';

export default abstract class BaseEventHandler<T extends BaseEvent>
  implements IEventHandler<T>
{
  protected abstract eventExecutionRepository: IEventExecutionRepository;

  async handle(event: T): Promise<void> {
    const eventId = randomUUID();
    try {
      await this.beforeHandle(event, eventId);
      await this.onHandle(event);
      await this.afterHandle(event, eventId);
    } catch (error) {
      await this.handleError(event, eventId, error);
    }
  }

  abstract onHandle(event: T): Promise<void>;

  async beforeHandle(event: T, eventId: UUID): Promise<void> {
    const eventExecution = EventExecution.create(
      eventId,
      event,
      event.constructor.name,
      this.constructor.name,
    );

    await this.eventExecutionRepository.insert(eventExecution);
  }

  async afterHandle(event: BaseEvent, eventId: UUID): Promise<void> {
    const eventExecution = await this.eventExecutionRepository.findById(
      eventId,
    );
    if (!eventExecution) throw new Error('Event execution not found');

    EventExecutionLogic.makeExecuted(eventExecution);
    await this.eventExecutionRepository.update(eventExecution);
  }

  async handleError(
    event: BaseEvent,
    eventId: UUID,
    error: Error,
  ): Promise<void> {
    const eventExecution = await this.eventExecutionRepository.findById(
      eventId,
    );
    if (!eventExecution) throw new Error('Event execution not found');
    EventExecutionLogic.makeFailed(eventExecution, error);
    await this.eventExecutionRepository.update(eventExecution);
  }
}
