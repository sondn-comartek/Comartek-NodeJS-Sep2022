import { Process, Processor } from '@nestjs/bull';
import { FileUploadService } from 'src/modules/fileupload/fileupload.service';
import { Job } from 'bull';
import { BookService } from './book.service';
@Processor('book')
export class BookConsumer {
    constructor(
        private readonly fileUploadService: FileUploadService,
        private readonly bookService: BookService
    ) { }

    @Process('convertImage')
    async convertImg(job: Job) {
        const { input, outputThumb, outputPreview } = job.data
        return await this.fileUploadService.convertImage(input, outputThumb, outputPreview)
    }

    @Process('exportExcel')
    async exportExcel(job: Job) {
        const { userId } = job.data
        return await this.bookService.exportExcel(userId)

    }
}