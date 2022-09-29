import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/books/schemas/book.schema';
import { CreateBookItemInput } from './dto/create-book-item.input';
import { UpdateBookItemInput } from './dto/update-book-item.input';
import { BookItem, BookItemDocument } from './schemas/book-item.schema';

@Injectable()
export class BookItemsService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
    @InjectModel(BookItem.name)
    private readonly bookItemModel: Model<BookItemDocument>,
  ) {}

  async create(createBookItemInput: CreateBookItemInput) {
    const { bookId } = createBookItemInput;
    const bookIdExist = await this.bookModel.findOne({ id: bookId });
    if (!bookIdExist) return new Error(`Book does not exist`);

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

  update(id: number, updateBookItemInput: UpdateBookItemInput) {
    return `This action updates a #${id} bookItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookItem`;
  }
}
