import { RegisterEvent } from 'src/common/core/decorators/register-event.decorator';
import Email from 'src/common/core/types/email';
import BaseEvent from 'src/utility-modules/bus/domain/base-classes/base-event';

@RegisterEvent()
export default class EmailSentEvent extends BaseEvent {
  constructor(public readonly email: Email) {
    super();
  }
}
