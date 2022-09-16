import { QuoteSchema } from './../quote/entities/quote.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { Shipment, ShipmentSchema } from './entities/shipment.entity';
import { Quote } from 'src/quote/entities/quote.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: Shipment.name, schema:ShipmentSchema}])],
  controllers: [ShipmentController],
  providers: [ShipmentService]
})
export class ShipmentModule {}
