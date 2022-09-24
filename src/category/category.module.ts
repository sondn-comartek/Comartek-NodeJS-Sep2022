import { Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../shared/schemas/category.schema';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoryResolver, CategoryService],
  // exports: [CategoryService],
})
export class CategoryModule {}
