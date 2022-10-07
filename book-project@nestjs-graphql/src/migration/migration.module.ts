import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../modules/user/models'
import { Book, BookSchema } from '../modules/book/models'
import { Category, CategorySchema } from '../modules/category/models'
import { Migration, MigrationSchema } from './migration.schema'
import { UserModule } from 'src/modules/user/user.module'
import { BookModule } from 'src/modules/book/book.module'
import { CategoryModule } from 'src/modules/category/category.module'
import { UserRepository } from 'src/modules/user/user.repository'
import { BookRepository } from 'src/modules/book/book.repository'
import { CategoryRepository } from 'src/modules/category/category.repository'
import { MigrationRepository } from './migration.repository'
import { MigrationCommand } from './migration.command'
import { OrderModule } from 'src/modules/order/order.module'
import { Image } from 'src/modules/image/models'
import { ImageModule } from 'src/modules/image/image.module'
import { OrderRepository } from 'src/modules/order/order.repository'
import { ImageRepository } from 'src/modules/image/image.repository'

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
      CategoryModule,
      OrderModule ,
      ImageModule ,
   ],
   providers: [
      UserRepository,
      BookRepository,
      CategoryRepository,
      MigrationRepository,
      OrderRepository ,
      ImageRepository ,
      MigrationCommand 
   ],
})
export class MigrationModule {}
