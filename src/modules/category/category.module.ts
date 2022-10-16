import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoryResolver } from './category.resolver'
import { Category, CategorySchema } from './models'
import { CategoryRepository } from './category.repository'
import { BookModule } from '../book/book.module'
import { BookRepository } from '../book/book.repository'
import { forwardRef } from '@nestjs/common'

@Module({
   imports: [
      MongooseModule.forFeature([
         {
            name: Category.name,
            schema: CategorySchema,
         },
      ]),
      forwardRef(() => BookModule),
   ],
   providers: [
      CategoryResolver,
      CategoryService,
      CategoryRepository,
      BookRepository,
   ],
   exports: [CategoryRepository, MongooseModule, CategoryService],
})
export class CategoryModule {}
