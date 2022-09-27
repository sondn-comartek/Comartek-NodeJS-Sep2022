import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { HelpersService } from 'src/helpers/helpers.service';
import { BullModule } from '@nestjs/bull';
import { CategoryConsumer } from './categories.processor';

@Module({
  providers: [
    CategoriesResolver,
    CategoriesService,
    HelpersService,
    CategoryConsumer,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    BullModule.registerQueue({
      name: 'category',
    }),
  ],
})
export class CategoriesModule {}
