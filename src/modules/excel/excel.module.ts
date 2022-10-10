import { Module } from '@nestjs/common'
import { ExcelService } from './excel.service'
import { ExcelResolver } from './excel.resolver'
import { UserModule } from '../user/user.module'
import { BookModule } from '../book/book.module'
import { CategoryModule } from '../category/category.module'
import { ImageModule } from '../image/image.module'
import { OrderModule } from '../order/order.module'
import { BookRepository } from '../book/book.repository'
import { UserRepository } from '../user/user.repository'
import { OrderRepository } from '../order/order.repository'
import { ImageRepository } from '../image/image.repository'
import { BullModule } from '@nestjs/bull'
import { ExcelConsumer } from './excel.consumer'
import { ConfigModule } from '@nestjs/config'
import { PubSub } from 'graphql-subscriptions'
import { ExcelController } from './excel.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Excel, ExcelSchema } from './models'
import { ExcelRepository } from './excel.repository'

@Module({
   imports: [
      BullModule.registerQueue({
         name: 'excel',
      }),
      MongooseModule.forFeature([{
         name : Excel.name ,
         schema : ExcelSchema
      }]) ,
      UserModule,
      BookModule,
      CategoryModule,
      ImageModule,
      OrderModule,
      ConfigModule,
   ],
   controllers: [
      ExcelController
   ],
   providers: [
      ExcelConsumer,
      ExcelResolver,
      ExcelService,
      BookRepository,
      UserRepository,
      OrderRepository,
      ImageRepository,
      PubSub,
      ExcelRepository
   ],
})
export class ExcelModule {}
