import { Injectable } from '@nestjs/common'
import { BookRepository } from '../book/book.repository'
import { bookExcelColumn, userExcelColumn, orderExcelColumn } from './templates'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { genFileId } from 'src/ultils'
import { ConfigService } from '@nestjs/config'
import { Excel, ExcelDocument } from './models'
import { UserRepository } from '../user/user.repository'
import { OrderRepository } from '../order/order.repository'
import { Document } from 'mongoose'
import { Entity } from './types'
import { EnityRepository } from 'src/abstract'

@Injectable()
export class ExcelService {
   constructor(
      @InjectQueue('excel') private excelQueue: Queue,
      private bookRepository: BookRepository,
      private userRepository: UserRepository,
      private orderRepository: OrderRepository,
      private configService: ConfigService,
   ) {}

   private repositories: Record<string, EnityRepository<any>> = {
      user: this.userRepository,
      book: this.bookRepository,
      order: this.orderRepository,
   }

   private entityExcelColumn: Record<string, unknown> = {
      user: userExcelColumn,
      book: bookExcelColumn,
      order: orderExcelColumn,
   }

   async export(entity: Entity): Promise<Excel> {
      const excelId = genFileId(entity)
      const docs = await this.repositories[entity].FindAll({})
      docs.forEach((doc) => {
         doc.createdAt = new Date(doc.createdAt)
         doc.updatedAt = new Date(doc.updatedAt)
      })
      this.excelQueue.add('export', {
         docs: docs,
         id: excelId,
         columnTemplate: this.entityExcelColumn[entity],
      })
      return {
         excelId,
         excel_url:
            this.configService.get<string>('HOST_URL') + 'excels/' + excelId,
      }
   }
}
