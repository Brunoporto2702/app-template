import { IEvent } from '@nestjs/cqrs';
import { UUID, randomUUID } from 'crypto';

export default abstract class BaseEvent implements IEvent {
  public readonly id: UUID;
  constructor() {
    this.id = randomUUID();
  }
}
