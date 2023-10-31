import EmailResponse from 'src/utility-modules/notification/dtos/email-response.interface';
import SendEmailCommand from '../../command/send-email.command';

export default abstract class EmailSender {
  abstract send(email: SendEmailCommand): Promise<EmailResponse>;
}
