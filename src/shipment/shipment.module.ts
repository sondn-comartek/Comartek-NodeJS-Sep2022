import { ShipmentConsumer } from './shipment.consumer';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { Shipment, ShipmentSchema } from './entities/shipment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shipment.name, schema: ShipmentSchema },
    ]),
    BullModule.registerQueue({
      name: 'serial',
      // redis: {
      //   port: 6380,
      // }
    }),
  ],
  controllers: [ShipmentController],
  providers: [ShipmentService, ShipmentConsumer],
})
export class ShipmentModule {}
