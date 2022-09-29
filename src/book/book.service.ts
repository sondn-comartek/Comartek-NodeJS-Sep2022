import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { finished } from 'stream/promises';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import * as Resize from '../helper/image.resize';
import { unlink } from 'fs/promises';
import { v4 as uuid_v4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './entities/book.entity';
import { Model } from 'mongoose';
@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}
  async create(createBookInput: CreateBookInput) {
    const { createReadStream, filename } = await createBookInput?.image;
    const pathImage = `${process.env.PATH_IMAGE_SAVE_CATEGORY}${filename}`;
    const stream = await createReadStream();
    const out = await createWriteStream(pathImage);
    await stream.pipe(out);
    await finished(out);

    const pathFile = await Resize.categoryResize(pathImage);
    await unlink(pathImage);
    delete createBookInput.image;
    const dataInsert = {
      bookID: uuid_v4(),
      ...createBookInput,
      photo_urls: pathFile,
    };
    const createdBook = await this.bookModel.create(dataInsert);
    return createdBook;
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
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
      const pathFile = await Resize.categoryResize(pathImage);
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
