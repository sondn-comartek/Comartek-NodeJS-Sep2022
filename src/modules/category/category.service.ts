import { QueryArgsInput } from 'src/common/inputs/query-args.input';
import { MediaService } from './../media/media.service';
import { CreateCategoryInput } from './inputs/create-category.input';
import { Category } from './schemas/category.schema';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categorySchema: Model<Category>,
    private readonly mediaService: MediaService,
  ) {}

  async findByIds(ids: string[]): Promise<Category[]> {
    return await this.categorySchema.find({ _id: { $in: ids } });
  }

  async findById(id: string): Promise<Category> {
    return await this.categorySchema.findById(id);
  }

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const { name, code, mediaId } = createCategoryInput;

    if (await this.findByName(name)) {
      throw new ConflictException(
        `Category with name ${name} is already exist`,
      );
    }

    if (await this.findByCode(code)) {
      throw new ConflictException(
        `Category with code ${code} is already exist`,
      );
    }

    if (!(await this.mediaService.findById(mediaId))) {
      throw new BadRequestException(
        `Media item with ID ${mediaId} does not exist`,
      );
    }

    return await this.categorySchema.create(createCategoryInput);
  }

  async findByName(name: string): Promise<Category> {
    return await this.categorySchema.findOne({ name });
  }

  async findByCode(code: string): Promise<Category> {
    return await this.categorySchema.findOne({ code });
  }

  async findAll(queryArgsInput?: QueryArgsInput): Promise<Category[]> {
    return await this.categorySchema.find(
      {},
      {},
      { limit: queryArgsInput.limit, skip: queryArgsInput.skip },
    );
  }
}
