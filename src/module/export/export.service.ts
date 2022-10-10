import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { BooksService } from '../books/books.service';
import { CategoriesService } from '../categories/categories.service';
import * as dayjs from 'dayjs';
import { join } from 'path';

enum ExportDataType {
  BOOK = 'book_data',
  CATEGORY = 'category_data',
  RENT = 'rent_data',
  USER = 'user_data',
  IMAGE = 'image_data'
}

@Injectable()
export class ExportService {
  constructor(
    @InjectQueue('processData') private processDataQueue: Queue,
    private readonly booksService: BooksService,
    private readonly categoriesService: CategoriesService
  ) { }

  async exportBook(offset: number, limit: number) {
    const bookList = (await this.booksService.findAllBook(offset, limit)).book;
    let exportData = [];
    for (let book of bookList) {
      book = JSON.parse(JSON.stringify(book))
      const category = await this.categoriesService.findById(book.categoryId);
      delete book.categoryId
      book['category'] = category.categoryName;
      exportData.push(book);
    }

    const exportFields = [
      {
        label: 'No',
        value: 'counter'
      },
      {
        label: "Book's title",
        value: 'bookName'
      },
      {
        label: "Category",
        value: 'category'
      },
      {
        label: 'Chapter',
        value: 'chapter'
      },
      {
        label: "Number of Pages",
        value: 'totalPage'
      },
      {
        label: 'Number of Books',
        value: 'totalBook'
      },
      {
        label: 'Number of available book',
        value: 'availableBook'
      },
      {
        label: 'Created at (timestamp)',
        value: 'createdAt'
      },
      {
        label: 'Updated at (timestamp)',
        value: 'updatedAt'
      }
    ];

    const now = dayjs().valueOf().toString();
    const exportFileName = now + '-' + ExportDataType.BOOK;

    await this.processDataQueue.add('processData', {
      exportFileName: exportFileName,
      exportData: exportData,
      exportFields: exportFields
    })
    return join(process.cwd() , `./public/csv_files/${exportFileName}.csv`);
  };
}
