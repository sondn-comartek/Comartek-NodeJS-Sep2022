import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesService } from './categories.service';
import { CategorySchema } from './entities/category.entity';
import { BullModule } from '@nestjs/bull';
import { CategoryQueryResolver } from './resolvers/queries.resolver';
import { CategoryMutationResolver } from './resolvers/mutations.resolver';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Category', schema: CategorySchema}]),
    BullModule.registerQueue({
      name: 'uploadImage',
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => BooksModule)
  ],
  providers: [CategoryQueryResolver, CategoryMutationResolver,  CategoriesService],
  exports: [CategoryQueryResolver, CategoryMutationResolver,  CategoriesService]
})
export class CategoriesModule {}
