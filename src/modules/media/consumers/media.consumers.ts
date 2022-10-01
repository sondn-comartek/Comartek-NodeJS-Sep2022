import { OnQueueActive, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ResizingHelper } from 'src/helper/image.resize';

@Processor('media')
export class MediaConsumer {
  private readonly logger = new Logger('pending');
  constructor(private resizeHelper: ResizingHelper) {}
  @Process('resizing')
  resizing({ data }: Job<any>) {
    const size = data?.size;
    const path = data?.path;
    const pathResizeFile = data?.path_resize;
    const media_url = this.resizeHelper.resize(path, pathResizeFile, size);
    return { path: media_url };
  }
}
