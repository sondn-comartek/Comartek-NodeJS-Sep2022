import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shipment, ShipmentSchema } from './schemas/shipment.schema';
import { QuotesService } from 'src/quotes/quotes.service';
import { QuotesModule } from 'src/quotes/quotes.module';

@Module({
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
  imports: [
    MongooseModule.forFeature([
      { name: Shipment.name, schema: ShipmentSchema },
    ]),
    QuotesModule,
  ],
})
export class ShipmentsModule {}
