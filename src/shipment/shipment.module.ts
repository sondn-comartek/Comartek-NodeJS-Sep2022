import { Module } from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { ShipmentController } from "./shipment.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Shipment, ShipmentEntity } from "./entities/shipment.entity";
import { QuoteController } from "../quote/quote.controller";
import { QuoteService } from "../quote/quote.service";
import { Rate, RateEntity } from "../common/entities/rate.entity";
import { AuthModule } from "../auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { BullModule } from "@nestjs/bull/dist/bull.module";
import { CreateShipmentQueue } from "./constants";
import { ShipmentConsumer } from "./shipment.consumer";

@Module({
  imports: [
    BullModule.registerQueue({
      name: CreateShipmentQueue,
    }),
    AuthModule,
    MongooseModule.forFeature([
      { name: Shipment.name, schema: ShipmentEntity },
      { name: Rate.name, schema: RateEntity },
    ]),
    JwtModule,
  ],
  controllers: [ShipmentController, QuoteController],
  providers: [ShipmentService, QuoteService, ShipmentConsumer],
})
export class ShipmentModule {}
