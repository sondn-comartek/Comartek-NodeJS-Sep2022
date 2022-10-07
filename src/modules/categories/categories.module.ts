import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { BullModule } from '@nestjs/bull';
import { CategoryConsumer } from './categories.processor';
import { BooksModule } from '../books/books.module';
import { UploadModule } from '../upload/upload.module';
import { CategoriesMutation } from './resolvers/mutations.resolver';
import { CategoriesQuery } from './resolvers/queries.resolver';

@Module({
  providers: [
    CategoriesQuery,
    CategoriesMutation,
    CategoriesService,
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
