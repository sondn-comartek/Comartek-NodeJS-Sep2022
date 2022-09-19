import { Processor, Process } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { CreateShipmentQueue } from './constants';
import { Shipment } from './entities/shipment.entity';
import { Model } from 'mongoose';
import { Job } from "bull";

@Processor(CreateShipmentQueue)
export class ShipmentConsumer {
    constructor(
        @InjectModel(Shipment.name) private readonly shipmentEntity: Model<Shipment>
    ) { }

    @Process()
    async handleCreateShipment(job: Job<unknown>) {
        await this.shipmentEntity.create(job.data);

        console.log({
            data: job.data
        })

        return {}
    }
}

