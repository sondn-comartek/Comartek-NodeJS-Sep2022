import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { processUploadImage } from 'src/utils/process-upload-image';

@Processor('uploadImage')
export class ProcessUploadImageProcessor {
    private readonly logger = new Logger(ProcessUploadImageProcessor.name);

    @Process('uploadImage')
    handleProcessUploadImage(job: Job) {
        this.logger.debug('Start upload image...');
        const result = processUploadImage(job.data);
        if(result) {
            this.logger.debug('End upload image...')
        } else {
            this.logger.error('Error in uploading image.')
        }
    }
}