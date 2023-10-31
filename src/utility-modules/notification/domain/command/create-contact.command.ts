import { UUID } from 'crypto';
import Email from 'src/common/core/types/email';

export default class CreateContactCommand {
  constructor(
    public email: Email,
    public active: boolean,
    public userId?: UUID,
  ) {}
}
