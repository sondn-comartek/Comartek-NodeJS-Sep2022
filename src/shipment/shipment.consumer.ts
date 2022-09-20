import { ShipmentService } from './shipment.service';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
@Processor('serial')
export class ShipmentConsumer {
  private readonly logger = new Logger(ShipmentConsumer.name);
  constructor(private shipmentService:ShipmentService){}
  @Process('create_serial')
  async createSerial(job: Job) {
    let totalDocs = await this.shipmentService.counterShipment()
    const shipment = job.data
    const createdShipment = await this.shipmentService.createShipmentIntoDB({ ...shipment, serial: totalDocs + 1 })
    return createdShipment;
  }
}
