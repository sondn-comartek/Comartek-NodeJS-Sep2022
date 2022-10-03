import { OnGlobalQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { HelpersService } from '../../helpers/helpers.service';

@Processor('category')
export class CategoryConsumer {
  constructor(private readonly helpersService: HelpersService) {}

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    // console.log('result: ' + result);
    return result;
  }

  @Process('convertCategoryImage')
  async convertImage(job: Job) {
    // console.log('job data: ', job.data);
    const { filename, name, widthImage } = job.data;
    await this.helpersService.convertImage(filename, name, widthImage);
  }
}
