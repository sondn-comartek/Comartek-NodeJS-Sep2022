import { OnQueueActive, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as sharp from 'sharp';
import { ResizingHelper } from 'src/helper/image.resize';
@Processor('media')
export class MediaConsumer {
  private readonly logger = new Logger('pending');
  constructor(private resizeHelper: ResizingHelper) {}
  @Process('resizing')
  resizing({ data }: Job<any>) {
    const size = data?.size;
    const path = data?.path;
    this.resizeHelper.resize(path, size);
    return {};
  }
  // @OnQueueFailed()
  // handler(job: Job, error: Error) {
  //   console.log('fired exception');
  // }
}
