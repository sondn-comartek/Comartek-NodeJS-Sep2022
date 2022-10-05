import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from 'src/modules/books/books.module';
import { Book, BookSchema } from 'src/modules/books/entities/book.entity';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import {
  Category,
  CategorySchema,
} from 'src/modules/categories/entities/category.entity';
import { User, UserSchema } from 'src/modules/users/entities/user.entity';
import { Migration } from './migrations.command';
import { MigrationSchema } from './migrations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Migration', schema: MigrationSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    BooksModule,
    CategoriesModule,
  ],
  providers: [Migration],
})
export class MigrationModule {}
