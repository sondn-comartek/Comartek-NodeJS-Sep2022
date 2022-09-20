import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from './schemas/quote.schema';
import { Rate, RateSchema } from './schemas/rate.schema';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService],
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
    MongooseModule.forFeature([{ name: Rate.name, schema: RateSchema }]),
  ],
  exports: [QuotesService, MongooseModule],
})
export class QuotesModule {}
