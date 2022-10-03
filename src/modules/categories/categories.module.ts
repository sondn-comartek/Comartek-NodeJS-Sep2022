import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { HelpersService } from '../../helpers/helpers.service';
import { BullModule } from '@nestjs/bull';
import { CategoryConsumer } from './categories.processor';
import { BooksModule } from '../books/books.module';
import { UploadModule } from '../upload/upload.module';

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
    BooksModule,
    UploadModule,
  ],
})
export class CategoriesModule {}
