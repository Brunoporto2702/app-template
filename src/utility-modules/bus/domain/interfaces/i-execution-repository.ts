import EventExecution from '../models/event-execution.model';

export abstract class IEventExecutionRepository {
  abstract insert(eventExecution: EventExecution): Promise<EventExecution>;
  abstract findById(id: string): Promise<EventExecution | null>;
  abstract update(
    eventExecution: EventExecution,
  ): Promise<EventExecution | null>;
}
