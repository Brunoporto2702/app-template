import BaseEvent from '../domain/base-classes/base-event';
import EventExecution from '../domain/models/event-execution.model';
import { EventExecutionEntity } from '../infra/data/entities/event-execution.entity';

export class EventExecutionMapper {
  static modelToDao(eventExecution: EventExecution): EventExecutionEntity {
    const eventExecutionDao = new EventExecutionEntity();
    eventExecutionDao.id = eventExecution.id;
    eventExecutionDao.payload = JSON.stringify(eventExecution.payload);
    eventExecutionDao.eventClassName = eventExecution.eventClassName;
    eventExecutionDao.handlerName = eventExecution.handlerName;
    eventExecutionDao.createdAt = eventExecution.createdAt;
    eventExecutionDao.status = eventExecution.status;
    eventExecutionDao.reprocessCount = eventExecution.reprocessCount;
    eventExecutionDao.lastReprocessAt = eventExecution.lastReprocessAt;
    eventExecutionDao.processedAt = eventExecution.processedAt;
    eventExecutionDao.errorMessage = eventExecution.errorMessage;
    return eventExecutionDao;
  }

  static daoToModel(eventExecutionDao: EventExecutionEntity): EventExecution {
    return {
      id: eventExecutionDao.id,
      payload: JSON.parse(eventExecutionDao.payload) as BaseEvent,
      eventClassName: eventExecutionDao.eventClassName,
      handlerName: eventExecutionDao.handlerName,
      createdAt: eventExecutionDao.createdAt,
      status: eventExecutionDao.status,
      reprocessCount: eventExecutionDao.reprocessCount,
      lastReprocessAt: eventExecutionDao.lastReprocessAt,
      processedAt: eventExecutionDao.processedAt,
      errorMessage: eventExecutionDao.errorMessage,
    };
  }
}
