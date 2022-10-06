import { BullModule } from '@nestjs/bull';
import { CategoryModule } from './../category/category.module';
import { BookModule } from './../book/book.module';
import { Module } from '@nestjs/common';
import { StatisticalResolver } from './statistical.resolver';
import { StatisticalService } from './statistical.service';
import { HelperModule } from 'src/helper/helper.module';
import { ExcelConsumer } from './consumers/excel.consumer';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from '../media/entities/media.entity';

@Module({
  imports: [
    BookModule,
    CategoryModule,
    HelperModule,
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
    BullModule.registerQueue({
      name: 'excel',
    }),
  ],
  providers: [StatisticalResolver, StatisticalService, ExcelConsumer],
})
export class StatisticalModule {}
