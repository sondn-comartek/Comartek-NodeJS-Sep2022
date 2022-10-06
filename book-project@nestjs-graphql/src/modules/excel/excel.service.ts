import { Injectable } from '@nestjs/common'
import { BookRepository } from '../book/book.repository'
import { bookExcelColumn } from './templates'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { genImageId } from 'src/ultils'
import * as fse from 'fs-extra'

@Injectable()
export class ExcelService {
   constructor(
      @InjectQueue('excel') private excelQueue: Queue,
      private bookRepository: BookRepository,
   ) {}

   async exportListBook() {
      const excelId = genImageId('book')
      const books = await this.bookRepository.FindAll({})
      this.excelQueue.add('export', {
         docs: books,
         id: excelId,
         columnTemplate: bookExcelColumn,
      })
      return excelId
   }
}
