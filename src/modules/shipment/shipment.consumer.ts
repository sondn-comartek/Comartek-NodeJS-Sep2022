import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ShipmentRepository } from './repositories';

@Processor('shipment')
export class ShipmentConsumer {
    private readonly logger = new Logger(ShipmentConsumer.name)
    constructor(private readonly ShipmentRepository: ShipmentRepository) {}
    @Process('create')
    async HandleCreate(job: Job ){
        return await this.ShipmentRepository.Create({
            ...job.data ,
            number : job.id
        })
    }
}