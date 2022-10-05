import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../../../src/modules/user/models'
import { Book, BookSchema } from '../../../src/modules/book/models'
import { Category, CategorySchema } from '../../../src/modules/category/models'
import { Migration, MigrationSchema } from './migration.schema'
import { UserModule } from 'src/modules/user/user.module'
import { BookModule } from 'src/modules/book/book.module'
import { CategoryModule } from 'src/modules/category/category.module'
import { UserRepository } from 'src/modules/user/user.repository'
import { BookRepository } from 'src/modules/book/book.repository'
import { CategoryRepository } from 'src/modules/category/category.repository'
import { MigrationRepository } from './migration.repository'
import { MigrationCommand } from './migration.command'
import { MigrationStrategy } from './migration.strategy'

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
            name: Category.name,
            schema: CategorySchema,
         },
         {
            name: Migration.name,
            schema: MigrationSchema,
         },
      ]),
      UserModule,
      BookModule,
      CategoryModule
   ],
   providers: [
      UserRepository,
      BookRepository,
      CategoryRepository,
      MigrationRepository,
      MigrationCommand 
   ],
})
export class MigrationModule {}
