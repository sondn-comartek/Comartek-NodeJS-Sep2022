import { OnGlobalQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { convertImage } from 'src/utils/image';

@Processor('category')
export class CategoryConsumer {
  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    // console.log('result: ' + result);
    return result;
  }

  @Process('convertCategoryImage')
  async convertImage(job: Job) {
    // console.log('job data: ', job.data);
    const { filename, name, widthImage } = job.data;
    await convertImage(filename, name, widthImage);
  }
}
