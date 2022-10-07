import { Injectable } from '@nestjs/common'
import { Command, Positional } from 'nestjs-command'
import { MigrationStrategy } from './migration.strategy'
import { BookRepository } from 'src/modules/book/book.repository'
import { CategoryRepository } from 'src/modules/category/category.repository'
import { UserRepository } from 'src/modules/user/user.repository'
import { MigrationRepository } from './migration.repository'
import { ImageRepository } from 'src/modules/image/image.repository'
import { OrderRepository } from 'src/modules/order/order.repository'

@Injectable()
export class MigrationCommand extends MigrationStrategy {
   constructor(
      userRepository: UserRepository,
      bookRepository: BookRepository,
      categoryRepository: CategoryRepository,
      migrationRepository: MigrationRepository,
      imageRepository: ImageRepository,
      orderRepository: OrderRepository,
   ) {
      super({
         userRepository: userRepository,
         bookRepository: bookRepository,
         categoryRepository: categoryRepository,
         imageRepository: imageRepository,
         orderRepository: orderRepository,
         migrationRepository: migrationRepository,
      })
   }

   @Command({
      command: 'database:migrate:one <migrationName>',
      describe: 'migrate database',
   })
   async migrateOne(
      @Positional({
         name: 'migrationName',
         describe: 'name of specific migratioan to run',
         type: 'string',
      })
      migrationName?: string,
   ) {
      try {
         if (!migrationName) throw new Error('migration name is required!')
         const result = await this.migrate(migrationName)
         console.log(result)
         console.log('!!!!!!!! MIGRATE DONE WITH SUCCESSFULLY !!!!!! ')
         process.exit(0)
      } catch (err) {
         console.log(err)
         console.error(
            '!!!!!!!!!!!!!!!!!!!!!!!!! MIGRATE DONE WITH ERROR !!!!!!!!!!!!!!!!!!!!!!!!!',
         )
         process.exit(0)
      }
   }

   @Command({
      command: 'database:migrate:all',
      describe: 'migrate database',
   })
   async migrateAll() {
      try {
         const result = await this.migrate()
         console.log(result)
         console.log('!!!!!!!! MIGRATE DONE WITH SUCCESSFULLY !!!!!! ')
         process.exit(0)
      } catch (err) {
         console.log(err)
         console.error(
            '!!!!!!!!!!!!!!!!!!!!!!!!! MIGRATE DONE WITH ERROR !!!!!!!!!!!!!!!!!!!!!!!!!',
         )
      }
   }
}
