import { UUID } from 'crypto';
import BaseEvent from '../base-classes/base-event';

export enum EventStatus {
  pending = 'pending',
  processed = 'processed',
  failed = 'failed',
}

export default class EventExecution {
  private constructor(
    public id: UUID,
    public payload: BaseEvent,
    public eventClassName: string,
    public handlerName: string,
    public status: string = EventStatus.pending,
    public createdAt: Date = new Date(),
    public reprocessCount: number = 0,
    public lastReprocessAt?: Date,
    public processedAt?: Date,
    public errorMessage?: string,
  ) {}

  public static create(
    id: UUID,
    payload: BaseEvent,
    eventClassName: string,
    handlerName: string,
  ): EventExecution {
    return new EventExecution(id, payload, eventClassName, handlerName);
  }
}
