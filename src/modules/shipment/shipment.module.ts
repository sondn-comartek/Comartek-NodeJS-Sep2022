import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { MongooseModule } from '@nestjs/mongoose' ;
import { RateSchema } from './entities/rate.entity';
import { QuoteSchema } from './entities/quote.entity';
import { ShipmentSchema } from './entities/shipment.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name : 'Rate',
        schema : RateSchema
      },
      {
        name : 'Quote',
        schema : QuoteSchema
      },
      {
        name : 'Shipment',
        schema : ShipmentSchema
      }
    ])
  ],
  controllers: [ShipmentController],
  providers: [ShipmentService]
})
export class ShipmentModule {}
