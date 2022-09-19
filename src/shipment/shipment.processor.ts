import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ShipmentService } from 'src/shipment/shipment.service';

@Processor('createShipment')
export class CreateShipmentProcessor {
    constructor(
        private readonly shipmentService: ShipmentService,
    ) { }
    private readonly logger = new Logger(CreateShipmentProcessor.name);

    @Process('createShipment')
    handleCreateShipment(job: Job) {
        this.logger.debug('Start createShipment...');
        return this.shipmentService.create(job.data.createShipmentDto);
    }
}