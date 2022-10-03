import { CreateBookInput } from './inputs/create-book.input';
import { CategoryService } from './../category/category.service';
import { Book } from './schemas/book.schema';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MediaService } from '../media/media.service';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookSchema: Model<Book>,
    private readonly categoryService: CategoryService,
    private readonly mediaService: MediaService,
  ) {}

  async findByTitle(title: string): Promise<Book> {
    return await this.bookSchema.findOne({ title });
  }

  async findById(id: string): Promise<Book> {
    return await this.bookSchema.findById(id);
  }

  async findByIds(ids: string[]): Promise<Book[]> {
    return await this.bookSchema.find({ _id: { $in: ids } });
  }

  async findByCondition(condition: any): Promise<Book[]> {
    return await this.bookSchema.find({ condition });
  }

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const { categoryId, mediaId, title } = createBookInput;

    if (!(await this.categoryService.findById(categoryId))) {
      throw new BadRequestException(
        `Category with ID ${categoryId} does not exist`,
      );
    }

    if (!(await this.mediaService.findById(mediaId))) {
      throw new BadRequestException(`Media with ID ${mediaId} does not exist`);
    }

    if (await this.findByTitle(title)) {
      throw new ConflictException(`Book with title ${title} is already exist`);
    }

    return await this.bookSchema.create(createBookInput);
  }

  async findAll(queryArgsInput: QueryArgsInput): Promise<Book[]> {
    return await this.bookSchema.find(
      {},
      {},
      {
        limit: queryArgsInput.limit,
        skip: queryArgsInput.skip,
      },
    );
  }
}
