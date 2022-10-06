import { CategoryService } from './../category/category.service';
import { Injectable } from '@nestjs/common';
import { createWriteStream, stat } from 'fs';
import { finished } from 'stream/promises';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { unlink } from 'fs/promises';
import { v4 as uuid_v4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './entities/book.entity';
import { Model } from 'mongoose';
import * as _ from 'lodash';
import { BookStatus } from './enums/status.enum';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    private categoryService: CategoryService,
  ) {}
  async create(createBookInput: CreateBookInput) {
    const dataInsert = {
      bookID: uuid_v4(),
      ...createBookInput,
    };
    const createdBook = await this.bookModel.create(dataInsert);
    return createdBook;
  }

  async findAll() {
    return await this.bookModel.find();
  }
  async totalBook() {
    return await this.bookModel.find().count();
  }
  async bookReadyToBorrow(id) {
    return await this.bookModel.find({
      bookID: id,
      status: BookStatus.available,
    });
  }
  async bookValid() {
    return await this.bookModel.find({ status: BookStatus.available }).count();
  }
  async bookInValid() {
    return await this.bookModel
      .find({ status: BookStatus.unavailable })
      .count();
  }
  async changeStatusBook(id: string, status: BookStatus) {
    return await this.bookModel.findOneAndUpdate(
      { bookID: id },
      { status: status },
    );
  }
  findOne(id: number) {
    return `This action returns a #${id} book`;
  }
  async findAllByField(field, values): Promise<Book[] | null> {
    return await this.bookModel
      .find({ category: { $in: values } })
      .sort({ status: 1 })
  }
  async findGroupBookByCategory(page = 1, record = 5) {
    return await this.bookModel
      .aggregate([
        {
          $group: {
            _id: { category: '$category', status: '$status' },
            count: { $sum: 1 },
          },
        },
      ])
      .skip(page * record)
      .limit(record);
  }
  findAmountBooks(bookIds: any) {
    return this.bookModel.find({ bookID: { $in: bookIds } }).count();
  }
  async update(updateBookInput: UpdateBookInput) {
    const bookID = updateBookInput?.bookID;
    const { createReadStream, filename } = await updateBookInput?.image;
    delete updateBookInput.bookID;
    let payload = {
      ...updateBookInput,
    };
    if (filename) {
      const pathImage = `${process.env.PATH_IMAGE_SAVE_CATEGORY}${filename}`;
      const stream = await createReadStream();
      const out = await createWriteStream(pathImage);
      await stream.pipe(out);
      await finished(out);
      const pathFile = '';
      // const pathFile = await Resize.categoryResize(pathImage);
      await unlink(pathImage);
      delete updateBookInput.image;
      payload['photo_urls'] = pathFile;
    }
    const updatedBook = await this.bookModel.findOneAndUpdate(
      { bookID: bookID },
      payload,
    );
    return updatedBook;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
