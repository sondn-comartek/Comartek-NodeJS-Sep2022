import { Book, BookSchema } from './../book/schemas/book.schema';
import { BookModule } from './../book/book.module';
import { MediaModule } from './../media/media.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryMutationResolver } from './resolvers/category-mutation.resolver';
import { CategoryQueryResolver } from './resolvers/category-query.resolver';
import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schemas/category.schema';
import { BookCategoryLoader } from '../loader/loader.book';

@Module({
  imports: [
    forwardRef(() => BookModule),
    MediaModule,
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  providers: [
    CategoryService,
    CategoryQueryResolver,
    CategoryMutationResolver,
    BookCategoryLoader,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
