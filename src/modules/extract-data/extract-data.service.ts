import { Injectable } from '@nestjs/common';
import { BookService } from '../book/book.service';

@Injectable()
export class ExtractDataService {
  constructor(private readonly bookService: BookService) {}

  async extractBookData(): Promise<any> {
    const books = await this.bookService.findAll();
    console.log({ books });
    return 
  }
}
