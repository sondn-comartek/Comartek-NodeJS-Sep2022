import { Rent, RentSchema } from 'src/modules/rent/schemas/rent.schema';
import { Book, BookSchema } from 'src/modules/book/schemas/book.schema';
import { User, UserSchema } from 'src/modules/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {
  Category,
  CategorySchema,
} from 'src/modules/category/schemas/category.schema';
import { Migration } from './migrations.command';
import { MigrationSchema } from './migrations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Book.name,
        schema: BookSchema,
      },
      {
        name: Rent.name,
        schema: RentSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: 'Migration',
        schema: MigrationSchema,
      },
    ]),
  ],
  providers: [Migration],
})
export class MigrationsModule {}
