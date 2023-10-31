import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import SendEmailCommand from 'src/utility-modules/notification/domain/command/send-email.command';
import { NotificationService } from 'src/utility-modules/notification/domain/services/notification.service';
import NewLeadTemplate from '../../domain/models/email-templates/new-lead.template';
import Email from 'src/common/core/types/email';
import { Response } from 'express';

export interface IEmail {
  name: string;
  email: string;
  role: string;
  company: string;
  message: string;
}

@Controller('email')
export class EmailController {
  constructor(
    @Inject(NotificationService)
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  async send(@Body() emailBody: IEmail, @Res() res: Response): Promise<any> {
    if (!emailBody || !emailBody.email) throw new Error('Invalid email');
    const newLeadTemplate = new NewLeadTemplate(emailBody);

    const sendEmailCommand = new SendEmailCommand(
      [Email.create('your-company@email.com')],
      newLeadTemplate.getBody(),
      newLeadTemplate.getSubject(),
    );

    await this.notificationService.sendEmail(sendEmailCommand);
    res.sendStatus(200);
  }
}
