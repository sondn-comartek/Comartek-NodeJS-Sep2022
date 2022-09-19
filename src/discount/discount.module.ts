import { RateEntity } from "src/common/entities/rate.entity";
import { Module } from "@nestjs/common";
import { DiscountService } from "./discount.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Rate } from "src/common/entities";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rate.name,
        schema: RateEntity,
      },
    ]),
  ],
  providers: [DiscountService],
})
export class DiscountModule {}
