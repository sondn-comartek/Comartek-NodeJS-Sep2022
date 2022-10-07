import { Processor, Process } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { HelperService } from '../helper/helper.service';
import { PUB_SUB } from '../pubSub/pubSub.module';

@Processor({name: 'usercsv'})
export class UserCSVConsumer {
  constructor(private readonly helperService: HelperService,
              @Inject(PUB_SUB) private pubSub: RedisPubSub) {}
  @Process()
  async CSVProcess(job: Job<any>) {
    const id = await this.helperService.genUserCSVfile()
    await this.pubSub.publish("onCSV", {onFileProcessScuccess: {userid: job.data.id, fileId: id, message: "prcoess scuccess"}})
    return
  }
}