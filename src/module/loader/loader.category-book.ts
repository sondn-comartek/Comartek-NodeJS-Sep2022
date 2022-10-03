import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { BooksService } from 'src/module/books/books.service';
import { Book } from 'src/module/books/entities/book.entity';
import { sortDataByIds } from './loader.sort';

@Injectable()
export class CategoryBookLoader implements NestDataLoader<string, Book> {
  constructor(
    private readonly booksService: BooksService  
  ) {}

  generateDataLoader(): DataLoader<string | null, Book> {
    return new DataLoader<string, Book>(async(keys?: string[]) =>
      await this.booksService.findByCategoriesId(keys).then((data) => {
        const property = 'categoryId';
        
        return sortDataByIds(data, keys, property);
      }),
    );
  }
}