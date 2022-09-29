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
  ) {}

  async create(createBookInput: CreateBookInput) {
    try {
      const { name, part, categoryId } = createBookInput;

      const bookExist = await this.bookModel.find({ name });
      if (bookExist) {
        const bookExisted = bookExist.find((book) => book.part === part);
        if (bookExisted) return new Error(`Book already exists`);

        const categoryExist = await this.categoryModel.findOne({
          id: categoryId,
        });
        if (!categoryExist) return new Error(`No category exists`);
      }

      const { image, widthImage } = createBookInput;

      const { createReadStream, filename } = await image;

      createReadStream()
        .pipe(
          createWriteStream(
            join(process.cwd(), `./src/upload/books/origin/${filename}`),
          ),
        )
        .on('finish', async () => {
          await this.bookQueue.add(
            'convertBookImage',
            {
              input:
                process.cwd() + `\\src\\upload\\books\\origin\\${filename}`,
              outputThumb:
                process.cwd() +
                `\\src\\upload\\books\\thumb\\${name}_thumb.webp`,
              outputPreview:
                process.cwd() +
                `\\src\\upload\\books\\preview\\${name}_preview.webp`,
              outputCustom:
                process.cwd() +
                `\\src\\upload\\books\\custom\\${name}_custom_w${widthImage}.jpg`,
              widthImage,
            },
            { delay: 3000 },
          );

          return true;
        })
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });

      return await new this.bookModel({
        ...createBookInput,
        image: filename,
      }).save();
    } catch (e) {
      throw new Error(e);
    }
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
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
