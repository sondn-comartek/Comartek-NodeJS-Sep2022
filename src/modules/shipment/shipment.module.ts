import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { MongooseModule } from '@nestjs/mongoose' ;
import { RateSchema } from './entities';
import { QuoteSchema } from './entities';
import { ShipmentSchema } from './entities';
import { QuoteRepository, ShipmentRepository } from './repositories';
import { RateRepository } from './repositories/rate.repository';
import { BullModule } from '@nestjs/bull';
import { ShipmentConsumer } from './shipment.consumer';
import { ShipmentSchedule } from './shipment.schedule';

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
    ]) ,
    BullModule.registerQueue({
      name : 'shipment'
    })
  ],
  controllers: [ShipmentController],
  providers: [
    ShipmentService ,
    ShipmentRepository ,
    QuoteRepository ,
    RateRepository ,
    ShipmentSchedule  ,
    ShipmentConsumer 
  ]
})
export class ShipmentModule {}
