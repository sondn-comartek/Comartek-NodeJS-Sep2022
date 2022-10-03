import { OnGlobalQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { HelpersService } from 'src/helpers/helpers.service';

@Processor('book')
export class BookConsumer {
  constructor(private readonly helpersService: HelpersService) {}

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    // console.log('result: ' + result);
    return result;
  }

  @Process('convertBookImage')
  async convertImage(job: Job) {
    // console.log('job data: ', job.data);
    const { filename, name, widthImage } = job.data;
    await this.helpersService.convertImage(filename, name, widthImage);
  }
}
