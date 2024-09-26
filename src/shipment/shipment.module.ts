import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { Shipment, ShipmentSchema } from './entities/shipment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CreateShipmentProcessor } from './shipment.processor';
import { BullModule } from '@nestjs/bull';
import { QuoteModule } from 'src/quote/quote.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Shipment', schema: ShipmentSchema}]),
    AuthModule,
    BullModule.registerQueue({
      name: 'createShipment',
    }),
    QuoteModule
  ],
  controllers: [ShipmentController],
  providers: [ShipmentService, CreateShipmentProcessor]
})
export class ShipmentModule {}
