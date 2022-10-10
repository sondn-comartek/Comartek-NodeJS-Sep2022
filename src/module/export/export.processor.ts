import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { json2csv } from 'src/utils/json2csv';
import { NotificationMsg } from '../notification/enums/notification-msg.enum';
import { NotificationType } from '../notification/enums/notification-type.enum';
import { NotificationService } from '../notification/notification.service';
import { PubsubService } from '../pubsub/pubsub.service';

@Processor('processData')
export class ProcessDataProcessor {
    private readonly logger = new Logger(ProcessDataProcessor.name);

    constructor(
        private readonly pubsubService: PubsubService,
        private readonly notificationService: NotificationService
    ) { }

    @Process('processData')
    async handleProcessData(job: Job) {
        this.logger.debug('Start generate csv file...');
        const filePath = json2csv(job.data);

        const notification = await this.notificationService.create(NotificationType.CSV_EXPORT_SUCCESSFUL, NotificationMsg.CSV_EXPORT_SUCCESSFUL);
        notification['data'] = filePath;
        
        this.pubsubService.publicEvent(NotificationType.CSV_EXPORT_SUCCESSFUL, notification);
        this.logger.debug('End generate csv file...');
    }
}