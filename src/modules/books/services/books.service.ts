import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from '../../categories/entities/category.entity';
import { LoansService } from '../../loans/services/loans.service';
import { PubsubService } from '../../pubsub/pubsub.service';
import { UploadService } from '../../upload/services/upload.service';
import { CreateBookInput } from '../dto/create-book.input';
import { UpdateBookInput } from '../dto/update-book.input';
import { Book, BookDocument } from '../entities/book.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectQueue('book') private bookQueue: Queue,
    private readonly uploadService: UploadService,
    private readonly loansService: LoansService,
    private readonly pubsubService: PubsubService,
  ) {}

  async create(createBookInput: CreateBookInput) {
    try {
      const { name, part, categoryId, imageId, widthImage } = createBookInput;

      const bookExist = await this.bookModel.find({ name });
      if (bookExist) {
        const bookExisted = bookExist.find((book) => book.part === part);
        if (bookExisted) return new Error(`Book already exists`);

        const categoryExist = await this.categoryModel.findOne({
          id: categoryId,
        });
        if (!categoryExist) return new Error(`No category exists`);
      }

      const imageExist = await this.uploadService.findOne(imageId);
      if (!imageExist) return new Error(`Image doesn't not exist`);

      await this.bookQueue.add(
        'convertBookImage',
        {
          filename: imageExist.filename,
          name,
          widthImage,
        },
        { delay: 3000 },
      );

      const newBook = await new this.bookModel({
        ...createBookInput,
      }).save();

      await this.pubsubService.publishEvent('createNewBook', {
        createNewBook: newBook,
      });

      return newBook;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll() {
    return await this.bookModel.find();
  }

  async findOne(id: string) {
    return await this.bookModel.findOne({ id });
  }

  async getTotalBook() {
    const getTotalBook = await this.bookModel.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$quantity' },
        },
      },
    ]);

    return getTotalBook[0].totalAmount;
  }

  async listBook() {
    const total = await this.getTotalBook();
    const borrowed = await this.loansService.getTotalBorrowed();
    const rest = total - borrowed;
    return { total, borrowed, rest };
  }

  async listBooks(bookId: string) {
    const book = await this.bookModel.findOne({ id: bookId });
    const { quantity } = book;
    const borrowed = await this.loansService.getBorrowedByBookId(bookId);
    const rest = quantity - borrowed;
    return { total: quantity, borrowed, rest };
  }

  async getBorrowedByCategoryId(categoryId: string) {
    const books = await this.bookModel.find({ categoryId: categoryId });
    let totalByCategory = 0;
    let borrowedByCategory = 0;
    let restByCategory = 0;
    for (let i = 0; i < books.length; i++) {
      const listBook = await this.listBooks(books[i].id);
      const { total, borrowed, rest } = listBook;
      totalByCategory += total;
      borrowedByCategory += borrowed;
      restByCategory += rest;
    }

    return {
      total: totalByCategory,
      borrowed: borrowedByCategory,
      rest: restByCategory,
    };
  }

  async getBooksByBatch(bookIds: string[]): Promise<(Book | any)[]> {
    const books = await this.bookModel.find({ id: { $in: bookIds } });
    const mappedBooks = bookIds.map(
      (bookId) => books.find((book) => book.id === bookId) || null,
    );
    // console.log('mappedBooks', mappedBooks);
    return mappedBooks;
  }

  async exportBook() {
    const books = await this.bookModel.find();
    await this.bookQueue.add(
      'exportBooks',
      {
        books,
      },
      { delay: 3000 },
    );

    const exportPath = './src/stores/exports/books/books.xlsx';

    await this.pubsubService.publishEvent('exportBooks', {
      exportBooks: exportPath,
    });

    return `Export book completed `;
  }

  async update(id: string, updateBookInput: UpdateBookInput) {
    return await this.bookModel.findOneAndUpdate(
      { id },
      { $set: { ...updateBookInput, updatedAt: dayjs(new Date()).unix() } },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    const bookExist = await this.bookModel.findOne({ id });
    if (!bookExist) {
      return new Error(`Book does not exist`);
    }

    return await this.bookModel.deleteOne({ id });
  }
}
