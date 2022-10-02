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

  findAll() {
    return 'hello world';
  }
  findOne(id: number) {
    return `This action returns a #${id} book`;
  }
  async findGroupBookByCategory() {
    return await this.bookModel.aggregate([
      {
        $group: {
          _id: { category: '$category', status: '$status' },
          count: { $sum: 1 },
        },
      },
    ]);
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
