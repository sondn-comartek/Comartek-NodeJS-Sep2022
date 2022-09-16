import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { Quote, QuoteSchema } from './entities/quote.entity';
import { Rate, RateSchema } from './entities/rate.entity';
@Module({
  imports:[MongooseModule.forFeature([{name: Quote.name, schema: QuoteSchema}, {name:Rate.name, schema: RateSchema}])],
  controllers: [QuoteController],
  providers: [QuoteService]
})
export class QuoteModule {}
