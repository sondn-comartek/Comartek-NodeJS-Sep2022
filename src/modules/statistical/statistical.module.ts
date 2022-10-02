import { CategoryModule } from './../category/category.module';
import { BookModule } from './../book/book.module';
import { Module } from '@nestjs/common';
import { StatisticalResolver } from './statistical.resolver';
import { StatisticalService } from './statistical.service';

@Module({
  imports: [BookModule, CategoryModule],
  providers: [StatisticalResolver, StatisticalService]
})
export class StatisticalModule {}
