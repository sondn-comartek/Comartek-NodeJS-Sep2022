import { MediaModule } from './../media/media.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryMutationResolver } from './resolvers/category-mutation.resolver';
import { CategoryQueryResolver } from './resolvers/category-query.resolver';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schemas/category.schema';

@Module({
  imports: [
    MediaModule,
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [CategoryService, CategoryQueryResolver, CategoryMutationResolver],
  exports: [CategoryService],
})
export class CategoryModule {}
