import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { BooksService } from './books.service';
import { BookSchema } from './entities/book.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { BookQueryResolver } from './resolvers/queries.resolver';
import { BookMutationResolver } from './resolvers/mutations.resolver';
import { CategoriesModule } from '../categories/categories.module';
import { ExportModule } from '../export/export.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Book', schema: BookSchema}
    ]),
    BullModule.registerQueue({
      name: 'uploadImage',
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => ExportModule)
  ],
  providers: [BookQueryResolver, BookMutationResolver, BooksService],
  exports: [BookQueryResolver, BookMutationResolver, BooksService]
})
export class BooksModule {}
