import EventExecution, { EventStatus } from '../models/event-execution.model';

export function makeExecuted(eventExecution: EventExecution): EventExecution {
  eventExecution.status = EventStatus.processed;
  eventExecution.processedAt = new Date();
  return eventExecution;
}

export function makeFailed(
  eventExecution: EventExecution,
  error: Error,
): EventExecution {
  eventExecution.status = EventStatus.failed;
  eventExecution.errorMessage = error.toString();
  return eventExecution;
}
