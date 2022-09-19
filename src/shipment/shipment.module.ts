import { Module } from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { ShipmentController } from "./shipment.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Shipment, ShipmentEntity } from "./entities/shipment.entity";
import { QuoteController } from "../quote/quote.controller";
import { QuoteService } from "../quote/quote.service";
import { Rate, RateEntity } from "../common/entities/rate.entity";
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Shipment.name, schema: ShipmentEntity },
      { name: Rate.name, schema: RateEntity },
    ]),
    JwtModule,
  ],
  controllers: [ShipmentController, QuoteController],
  providers: [ShipmentService, QuoteService],
})
export class ShipmentModule { }
