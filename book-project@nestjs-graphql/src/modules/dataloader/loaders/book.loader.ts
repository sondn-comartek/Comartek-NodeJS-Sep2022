import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader'
import { Book, BookDocument } from 'src/modules/book/models';
import { NestDataLoader } from 'nestjs-dataloader';
import { BookService } from 'src/modules/book/book.service';
import { maping } from '../helpers';

@Injectable()
export class BookLoader implements NestDataLoader< string , Book >{
    constructor(
        private readonly bookService:BookService
    ){}
    generateDataLoader():DataLoader<string , Book>{
        return new DataLoader( async ( bookids: string[] ) => {
            const books = await this.bookService.findBooksByBookIds(bookids)
            return maping<BookDocument>('bookid' , bookids , books)
        })
    }
}