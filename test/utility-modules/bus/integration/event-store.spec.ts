import { Test, TestingModule } from '@nestjs/testing';
import baseApp from '../base-app';
import BaseEvent from 'src/utility-modules/bus/domain/base-classes/base-event';
import { IEventExecutionRepository } from 'src/utility-modules/bus/domain/interfaces/i-execution-repository';
import { INestApplication, Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import BaseEventHandler from 'src/utility-modules/bus/domain/base-classes/handler-wrapper';
import { EventStatus } from 'src/utility-modules/bus/domain/models/event-execution.model';
import * as crypto from 'crypto';

class TestEvent extends BaseEvent {
  constructor(public data: string) {
    super();
  }
}

@EventsHandler(TestEvent)
class TestEventHandler extends BaseEventHandler<TestEvent> {
  constructor(
    @Inject(IEventExecutionRepository)
    readonly eventExecutionRepository: IEventExecutionRepository,
  ) {
    super();
  }

  async onHandle(): Promise<void> {
    // do nothing
  }
}

describe('Event Store', () => {
  let app: INestApplication;
  let eventExecutionRepository: IEventExecutionRepository;
  let eventHandler: TestEventHandler;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      ...baseApp,
      providers: [TestEventHandler],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    eventExecutionRepository = app.get(IEventExecutionRepository);
    eventHandler = app.get(TestEventHandler);
  });

  afterEach(async () => {
    await app.close();
  }, 3000);

  it('should store event', async () => {
    const event = new TestEvent('test');
    const id = crypto.randomUUID();

    jest.spyOn(crypto, 'randomUUID').mockImplementationOnce(() => id);

    await eventHandler.handle(event);

    const eventExecution = await eventExecutionRepository.findById(id);
    expect(eventExecution).toBeDefined();
    expect(eventExecution).toMatchObject({
      id: id,
      payload: event,
      eventClassName: event.constructor.name,
      status: EventStatus.processed,
    });
  });

  it('should store event with error', async () => {
    const event = new TestEvent('test');
    const error = new Error('test error');

    const id = crypto.randomUUID();

    jest.spyOn(crypto, 'randomUUID').mockImplementationOnce(() => id);

    jest.spyOn(eventHandler, 'onHandle').mockImplementation(() => {
      throw error;
    });

    await eventHandler.handle(event);

    const eventExecution = await eventExecutionRepository.findById(id);
    expect(eventExecution).toBeDefined();
    expect(eventExecution).toMatchObject({
      id: id,
      payload: event,
      eventClassName: event.constructor.name,
      status: EventStatus.failed,
      errorMessage: error.toString(),
    });
  });
});
