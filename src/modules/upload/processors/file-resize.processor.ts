import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { FileResizeHelper } from '../helpers/file-resize.helper';

@Processor('file-processor')
export class FileResizeProcessor {
  constructor(private readonly fileResizeHelper: FileResizeHelper) {}

  @Process('resize')
  async resizeFile(job: Job) {
    const { media, width, height, buffer } = job.data;
    console.log(job.data);

    await this.fileResizeHelper.resizeFile(media, width, height, buffer);

    return 'DONE';
  }
}
