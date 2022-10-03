import { Book } from './../book/schemas/book.schema';
import { Rent } from '../rent/schemas/rent.schema';
import { NestDataLoader } from 'nestjs-dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { sortDataByRefIds } from './loader.sort';
import { BookService } from '../book/book.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookLoader implements NestDataLoader<string, Book> {
  constructor(private readonly bookService: BookService) {}

  generateDataLoader(): DataLoader<string, Book> {
    return new DataLoader<string, Book>((keys: string[]) =>
      this.bookService.findByIds(keys),
    );
  }
}

@Injectable()
export class BookCategoryLoader implements NestDataLoader<string, Book> {
  constructor(
    @InjectModel(Book.name) private readonly bookSchema: Model<Book>,
  ) {}

  generateDataLoader(): DataLoader<string, Book> {
    return new DataLoader<string, Book>(async (categoryIds: string[]) => {
      const books = await this.bookSchema
        .find({})
        .populate('categoryId mediaId');

      console.log({ books });

      return sortDataByRefIds({
        refIdFieldName: 'categoryId',
        refIds: categoryIds,
        entities: books,
      });
    });
  }
}
