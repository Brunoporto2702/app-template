import { UUID } from 'crypto';
import EmailSender from 'src/utility-modules/notification/domain/interfaces/email/email.sender';

interface IResendResponse {
  id: UUID;
}

export default class ResendSenderMock extends EmailSender {
  async send(): Promise<IResendResponse> {
    // fake id reponse
    const response: IResendResponse = {
      id: '0a5edb04-6fea-4b00-96f2-55a773a4576c',
    };

    return {
      id: response.id,
    };
  }
}
