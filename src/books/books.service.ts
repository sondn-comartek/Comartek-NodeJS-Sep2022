import { InjectQueue } from '@nestjs/bull';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { createWriteStream } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import {
  Category,
  CategoryDocument,
} from 'src/categories/schemas/category.schema';
import { LoansService } from 'src/loans/loans.service';
import { UploadService } from 'src/upload/upload.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book, BookDocument } from './schemas/book.schema';

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

      async () => {
        await this.bookQueue.add(
          'convertBookImage',
          {
            filename: imageExist.filename,
            name,
            widthImage,
          },
          { delay: 3000 },
        );

        return true;
      };
      return await new this.bookModel({
        ...createBookInput,
      }).save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll() {
    return await this.bookModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
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

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
