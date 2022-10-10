import { ExportFields } from './dto/export-fields.input';
import { CategoryService } from './../category/category.service';
import { Injectable, StreamableFile } from '@nestjs/common';
import { BookService } from '../book/book.service';
import { v4 as uuidV4 } from 'uuid';
import * as _ from 'lodash';
import { faker } from '@faker-js/faker';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectModel } from '@nestjs/mongoose';
import { Media, MediaDocument } from '../media/entities/media.entity';
import { Model } from 'mongoose';
import { createReadStream } from 'fs';
import { join } from 'path';
@Injectable()
export class StatisticalService {
  constructor(
    @InjectQueue('excel') private excelQueue: Queue,
    private categoryService: CategoryService,
    private bookService: BookService,
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
  ) {}
  async findTotalBookEachCategory(page: number, record: number): Promise<any> {
    const categories = await this.categoryService.findAll();
    const amountEachCategory = await this.bookService.findGroupBookByCategory(
      page,
      record,
    );
    let result = [];
    _.forEach(amountEachCategory, (o) => {
      const { category, status } = o?._id;
      const amount = o?.count;
      const isCategoryValid = _.find(categories, ['id', category]);
      let data = {
        categoryID: isCategoryValid?._id,
        name: isCategoryValid?.name,
        photo_id: isCategoryValid?.photo_id,
        total: amount,
        status: status,
      };
      result.push(data);
    });
    return result;
  }
  async bookInStore(page, record): Promise<any> {
    const total = await this.bookService.totalBook();
    const unAvailable = await this.bookService.bookInValid();
    const available = await this.bookService.bookValid();

    return { total: total, book_valid: available, book_invalid: unAvailable };
  }
  async exportData(exportFields: ExportFields, user) {
    const books = await this.bookService.findAllByField(
      'status',
      exportFields.category,
    );
    const filename = `${
      process.env.EXCEL_FILES_PATH
    }${faker.internet.userName()}.xlsx`;
    const createdFile = await this.mediaModel.create({
      mediaID: uuidV4(),
      description: filename,
      media_urls: filename,
    });
    this.excelQueue.add('export', {
      filename: filename,
      books: books,
      user: user,
    });
    return createdFile;
  }
  streamRender(filePath) {
    const file = createReadStream(join(process.cwd(), filePath));
    return new StreamableFile(file);
  }
}
