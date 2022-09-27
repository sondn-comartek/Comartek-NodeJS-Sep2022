import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
  ) {}

  async create(createBookInput: CreateBookInput) {
    try {
      const { name, part, categoryId } = createBookInput;
      const bookExist = await this.bookModel.findOne({ name });
      if (bookExist?.part === part) return new Error(`Book already exists`);

      const categoryExist = await this.categoryModel.findOne({
        id: categoryId,
      });
      if (!categoryExist) return new Error(`No category exists`);

      return await new this.bookModel({
        ...createBookInput,
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

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
