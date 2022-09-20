import { OnGlobalQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ShipmentsService } from './shipments.service';

@Processor('shipment')
export class ShipmentConsumer {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    console.log('result: ' + result);
    return result;
  }

  @Process('createShipment')
  async createShipment(job: Job) {
    console.log('job data:', job.data.createShipmentDto);
    return await this.shipmentsService.create(job.data.createShipmentDto);
  }
}
