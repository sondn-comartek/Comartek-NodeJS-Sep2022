import {
   BadRequestException,
   ForbiddenException,
   Injectable,
   StreamableFile,
} from '@nestjs/common'
import { BookRepository } from '../book/book.repository'
import { bookExcelColumn, userExcelColumn, orderExcelColumn } from './templates'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { genFileId } from 'src/ultils'
import { ConfigService } from '@nestjs/config'
import { Excel, ExcelDocument } from './models'
import * as fse from 'fs-extra'
import { UserRepository } from '../user/user.repository'
import { OrderRepository } from '../order/order.repository'
import { Entity } from './types'
import { EnityRepository } from 'src/abstract'
import { Response } from 'express'
import { ExcelRepository } from './excel.repository'
import { ForbiddenError } from 'apollo-server-express'

@Injectable()
export class ExcelService {
   constructor(
      @InjectQueue('excel') private excelQueue: Queue,
      private configService: ConfigService,
      private bookRepository: BookRepository,
      private userRepository: UserRepository,
      private orderRepository: OrderRepository,
      private excelRepository: ExcelRepository,
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

   async export(entity: Entity, userid: string): Promise<ExcelDocument> {
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
      return await this.excelRepository.Create({
         userid,
         excelId,
         excel_url:
            this.configService.get<'string'>('HOST_URL') + 'excels/' + excelId,
      })
   }

   async streamFile(excelId: string, res: Response, userid: string) {
      const path = process.cwd() + '/src/storage/excels/' + excelId + '.xlsx'
      const excel = await this.excelRepository.FindOne({
         userid,
         excelId,
      })
      if (!excel) throw new ForbiddenException()
      return fse.open(path, null, (err) => {
         if (err)
            throw new BadRequestException(
               'Not found excel file named : ' + excelId,
            )
         return fse.createReadStream(path).pipe(res)
      })
   }
}
