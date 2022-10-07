import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../../books/entities/book.entity';
import { CreateBookItemInput } from '../dto/create-book-item.input';
import { UpdateBookItemInput } from '../dto/update-book-item.input';
import { BookItem, BookItemDocument } from '../entities/book-item.entity';

@Injectable()
export class BookItemsService {
  constructor(
    @InjectModel(BookItem.name)
    private readonly bookItemModel: Model<BookItemDocument>,
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(createBookItemInput: CreateBookItemInput) {
    const { bookId } = createBookItemInput;
    const bookExist = await this.bookModel.findOne({ id: bookId });
    if (!bookExist) return new Error(`Book does not exist`);

    await this.bookModel.findOneAndUpdate(
      { id: bookId },
      {
        $set: {
          quantity: bookExist.quantity + 1,
          updatedAt: dayjs(new Date()).unix(),
        },
      },
      {
        new: true,
      },
    );

    return await new this.bookItemModel({
      ...createBookItemInput,
    }).save();
  }

  async findAll() {
    return await this.bookItemModel.find();
  }

  async findOne(id: string) {
    return await this.bookItemModel.findOne({ id });
  }

  async getBookItemsByBatch(
    bookItemIds: string[],
  ): Promise<(BookItem | any)[]> {
    const bookItems = await this.bookItemModel.find({
      id: { $in: bookItemIds },
    });
    const mappedBookItems = bookItemIds.map(
      (id) => bookItems.find((bookItem) => bookItem.id === id) || null,
    );
    // console.log('mappedBookItems', mappedBookItems);
    return mappedBookItems;
  }

  async update(id: string, updateBookItemInput: UpdateBookItemInput) {
    return await this.bookItemModel.findOneAndUpdate(
      { id },
      { $set: { ...updateBookItemInput, updatedAt: dayjs(new Date()).unix() } },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    const bookItemExist = await this.bookItemModel.findOne({ id });
    if (!bookItemExist) {
      return new Error(`Book item does not exist`);
    }

    return await this.bookItemModel.deleteOne({ id });
  }
}
