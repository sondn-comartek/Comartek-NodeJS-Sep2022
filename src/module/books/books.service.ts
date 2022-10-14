import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';
import { join } from 'path';
import { CategoriesService } from '../categories/categories.service';
import { CategoryStatistic } from '../categories/entities/category-statistic.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book') private readonly book: Model<Book>,
    private readonly categoriesService: CategoriesService
  ) { }

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const { bookName, categoryId, chapter, bookImage } = createBookInput;
    const filename = (await bookImage).filename;
    const existedBook = await this.book.findOne({ bookName: bookName, chapter: chapter });
    if (existedBook) {
      throw new Error(`Book with name ${bookName} and chapter ${chapter} is existed. Can create a new book`);
    }
    const category = await this.categoriesService.findById(categoryId);
    if (!category) {
      throw new HttpException(`Category with id ${categoryId} not found`, HttpStatus.NOT_FOUND);
    }

    delete createBookInput.bookImage;
    const regex = /.png|.jpg|.jpeg/g;
    let newFilename = filename.replace(regex, '.webp');
    createBookInput['imageUrl'] = join(process.cwd(), `./public/images/books/${newFilename}`);

    const newBook = {
      ...createBookInput
    }

    const createdBook = await this.book.create(newBook);
    if (!createdBook) {
      throw new HttpException('Error in create a new book', HttpStatus.BAD_REQUEST);
    }
    return createdBook;
  }

  async findAllBook(offset: number, limit: number) {
    const bookList = await this.book.find().skip(offset).limit(limit);
    if (!bookList) {
      throw new Error('Error in getting book list');
    }

    const countAllBook = bookList.reduce((previousItem, currentItem) => previousItem + currentItem.totalBook, 0);
    const countRestBook = bookList.reduce((previousItem, currentItem) => previousItem + currentItem.availableBook, 0);
    return {
      book: bookList,
      countAllBook: countAllBook,
      countBookRent: countAllBook - countRestBook,
      countRestBook: countRestBook
    };
  }

  async findById(id: string) {
    const book = await this.book.findOne({ _id: id });
    if (!book) {
      throw new HttpException(`Book with id ${id} not found`,HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async findByIds(idList: string[]): Promise<Book[]> {
    const bookList = await this.book.find({
      _id: { $in: idList }
    });
    if (!bookList) {
      throw new HttpException('Error in getting book list', HttpStatus.BAD_REQUEST);
    }
    return bookList;
  }

  async findByCategoriesId(categoryIdList: string[]): Promise<Book[]> {
    const bookList = await this.book.find({
      'category': { $in: categoryIdList }
    })
    if (!bookList) {
      throw new HttpException('Error in getting book list', HttpStatus.BAD_REQUEST);
    }
    return bookList;
  }

  async countBookInfo(categoryId: string): Promise<CategoryStatistic> {
    const bookList = await this.book.find({
      categoryId: categoryId
    })
    
    if (!bookList) {
      throw new HttpException(`Error int get book list by id${categoryId}`, HttpStatus.BAD_REQUEST);
    }
    return {
      totalBook: bookList.reduce((preValue, curItem) => preValue + curItem.totalBook, 0),
      available: bookList.reduce((preValue, curItem) => preValue + curItem.availableBook, 0),
      hasRent: bookList.reduce((preValue, curItem) => preValue + curItem.totalBook, 0) - bookList.reduce((preValue, curItem) => preValue + curItem.availableBook, 0)
    }
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
