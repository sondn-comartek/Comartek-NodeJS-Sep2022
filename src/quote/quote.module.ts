import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { QuoteSchema } from './entities/quote.entity';
import { ReductionFactorSchema } from './entities/reduction-factor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Quote', schema: QuoteSchema}]),
    MongooseModule.forFeature([{name: 'ReductionFactor', schema: ReductionFactorSchema}])
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
  exports: [QuoteService]
})
export class QuoteModule {}
