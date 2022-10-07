import { NotificationService } from './../../notification/notification.service';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Excel } from 'src/helper/export.excel';
import { NotificationTypes } from 'src/modules/notification/enums/notification.enum';

@Processor('excel')
export class ExcelConsumer {
  constructor(private notificationService: NotificationService) {}
  @Process('export')
  async export({ data }: Job<any>) {
    const { books, filename, user } = data;
    const BookExcel = new Excel('Books in store', books, filename);
    const file = await BookExcel.export();

    await this.notificationService.create('notification_export', {
      content: 'export file success',
      ownerID: user?.userID,
      type: NotificationTypes.created,
      recipients: [user?.userID],
    });
  }
}
