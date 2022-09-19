import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { ShipmentDocument, Shipment } from 'src/schemas/shipment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
interface JobData {
  id: string
}
@Processor('createshipment')
export class ShipmentConsumer {
  constructor(
    @InjectModel("shipment") private shipmentModel: Model<Shipment>
    ) {}
  @Process()
  async transcode(job: Job<JobData>) {
    let max = await this.shipmentModel.find({}).sort('-number').then(data => data[0].number)
    ++max
    await this.shipmentModel.findByIdAndUpdate(job.data.id, {$set: {number: max}})
    return {};
  }
}