import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../books/entities/book.entity';
import { CreateBookItemInput } from './dto/create-book-item.input';
import { UpdateBookItemInput } from './dto/update-book-item.input';
import { BookItem, BookItemDocument } from './entities/book-item.entity';

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
      { $set: { quantity: bookExist.quantity + 1 } },
      {
        new: true,
      },
    );

    return await new this.bookItemModel({
      ...createBookItemInput,
    }).save();
  }

  findAll() {
    return `This action returns all bookItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookItem`;
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

  update(id: number, updateBookItemInput: UpdateBookItemInput) {
    return `This action updates a #${id} bookItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookItem`;
  }
}
