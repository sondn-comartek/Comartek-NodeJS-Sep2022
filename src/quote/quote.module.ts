import { Module } from "@nestjs/common";
import { QuoteService } from "./quote.service";
import { QuoteController } from "./quote.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Rate, RateEntity } from "src/common/entities/rate.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rate.name, schema: RateEntity }]),
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule { }
