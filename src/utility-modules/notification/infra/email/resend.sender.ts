import { ConfigService } from '@nestjs/config';
import EmailSender from '../../domain/interfaces/email/email.sender';
import { EmailMessage } from '../../domain/models/email-message';
import { Resend } from 'resend';
import EmailResponse from '../../dtos/email-response.interface';
import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ResendSender extends EmailSender {
  private resendClient: Resend;
  constructor(private configService: ConfigService) {
    super();
    this.resendClient = new Resend(
      this.configService.get<string>('RESEND_KEY'),
    );
  }

  async send(email: EmailMessage): Promise<EmailResponse> {
    try {
      const to =
        this.configService.get<string>('env') === 'production'
          ? email.to.map((emailObject) => emailObject.value)
          : this.configService.getOrThrow<string[]>('DEFAULT_TEST_EMAILS');

      const r = await this.resendClient.sendEmail({
        from: `${email.from.value}`,
        to: to,
        subject: email.subject,
        html: email.body,
        cc: email.cc?.map((emailObject) => emailObject.value),
      });

      return {
        id: r.id as UUID,
      };
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}
