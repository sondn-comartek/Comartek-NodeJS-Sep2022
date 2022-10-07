import { Injectable } from '@nestjs/common'
import { BookRepository } from '../book/book.repository'
import { bookExcelColumn } from './templates'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { genFileId } from 'src/ultils'

@Injectable()
export class ExcelService {
   constructor(
      @InjectQueue('excel') private excelQueue: Queue,
      private bookRepository: BookRepository,
   ) {}

   async exportListBook() {
      const excelId = genFileId('book')
      const books = await this.bookRepository.FindAll({})
      books.forEach( book => {
        book.createdAt = new Date(book.createdAt)
        book.updatedAt = new Date(book.updatedAt)
      })
      this.excelQueue.add('export', {
         docs: books ,
         id: excelId ,
         columnTemplate: bookExcelColumn,
      })
      return excelId
   }
}
