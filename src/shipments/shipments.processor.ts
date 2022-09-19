import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ShipmentsService } from './shipments.service';

@Processor('shipment')
export class AudioProcessor {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Process('createShipment')
  async createShipment(job: Job) {
    console.log('job data:', job.data.createShipmentDto);
    return await this.shipmentsService.create(job.data.createShipmentDto);
  }
}
