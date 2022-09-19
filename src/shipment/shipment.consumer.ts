import { Processor, Process } from "@nestjs/bull";
import { InjectModel } from "@nestjs/mongoose";
import { CreateShipmentQueue } from "./constants";
import { Shipment } from "./entities/shipment.entity";
import { Model } from "mongoose";
import { Job } from "bull";

@Processor(CreateShipmentQueue)
export class ShipmentConsumer {
  constructor(
    @InjectModel(Shipment.name) private readonly shipmentEntity: Model<Shipment>
  ) {}

  @Process("handleCreateShipment")
  async handleCreateShipment(job: Job<unknown>) {
    console.log({
      job: {
        id: job.id,
        date: job.data,
      },
    });

    await this.shipmentEntity.create(job.data);

    return "done";
  }
}
