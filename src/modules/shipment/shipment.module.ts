import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { MongooseModule } from '@nestjs/mongoose' ;
import { RateSchema } from './entities/rate.entity';
import { QuoteSchema } from './entities/quote.entity';
import { ShipmentSchema } from './entities/shipment.entity';
import { QuoteRepository, ShipmentRepository } from './repositories';
import { RateRepository } from './repositories/rate.repository';
import { ReinventRateSchedule } from './schedule';
import { BullModule } from '@nestjs/bull';
import { ShipmentConsumer } from './shipment.consumer';

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
    ReinventRateSchedule  ,
    ShipmentConsumer
  ]
})
export class ShipmentModule {}
