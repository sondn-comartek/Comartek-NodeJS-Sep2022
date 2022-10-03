import { Book } from './../book/schemas/book.schema';
import { NestDataLoader } from 'nestjs-dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { sortDataByRefIds, sortDataByIds } from './loader.sort';
import { BookService } from '../book/book.service';

@Injectable()
export class BookLoader implements NestDataLoader<string, Book> {
  constructor(private readonly bookService: BookService) {}

  generateDataLoader(): DataLoader<string, Book> {
    return new DataLoader<string, Book>((keys: string[]) =>
      this.bookService
        .findByIds(keys)
        .then((data) => sortDataByIds(data, keys)),
    );
  }
}

// Dùng để load books trong category
@Injectable()
export class BookCategoryLoader implements NestDataLoader<string, Book> {
  constructor(private readonly bookService: BookService) {}

  generateDataLoader(): DataLoader<string, Book> {
    return new DataLoader<string, Book>(async (categoryIds: string[]) => {
      const books = await this.bookService.findByCondition({
        categoryId: { $in: categoryIds },
      });

      return sortDataByRefIds({
        refIdFieldName: 'categoryId',
        refIds: categoryIds,
        entities: books,
      });
    });
  }
}
