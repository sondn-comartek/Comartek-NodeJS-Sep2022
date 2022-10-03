import { Process, Processor } from '@nestjs/bull';
import { FileUploadService } from 'src/modules/fileupload/fileupload.service';
import { Job } from 'bull';
@Processor('book')
export class BookConsumer {
    constructor(private readonly fileUploadService: FileUploadService) { }

    @Process('convertImage')
    async convertImg(job: Job) {
        const { input, outputThumb, outputPreview } = job.data
        return await this.fileUploadService.convertImage(input, outputThumb, outputPreview)
    }
}