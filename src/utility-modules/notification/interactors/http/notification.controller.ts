import { Controller, Inject } from '@nestjs/common';
import { NotificationService } from '../../domain/services/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    @Inject(NotificationService)
    private readonly notificationService: NotificationService,
  ) {}
}
