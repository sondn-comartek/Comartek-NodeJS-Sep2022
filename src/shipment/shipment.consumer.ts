import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
@Processor('serial')
export class ShipmentConsumer {
  private readonly logger = new Logger(ShipmentConsumer.name);
  @Process('create_serial')
  async createSerial(job: Job) {
    this.logger.log("starting")
    console.log('hello world');
    // await job.progress(0);
    return {};
  }
}
