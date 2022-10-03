import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category, CategoryDocument } from './entities/category.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { BooksService } from '../books/books.service';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectQueue('category') private categoryQueue: Queue,
    private readonly booksService: BooksService,
    private readonly uploadService: UploadService,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    try {
      const { name, imageId, widthImage } = createCategoryInput;
      const categoryExist = await this.categoryModel.findOne({ name });
      if (categoryExist) return new Error(`Category ${name} already exists`);

      const imageExist = await this.uploadService.findOne(imageId);
      if (!imageExist) return new Error(`Image doesn't not exist`);

      await this.categoryQueue.add(
        'convertCategoryImage',
        {
          filename: imageExist.filename,
          name,
          widthImage,
        },
        { delay: 3000 },
      );

      return await new this.categoryModel({
        ...createCategoryInput,
      }).save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async listCategory(categoryId: string) {
    return await this.booksService.getBorrowedByCategoryId(categoryId);
  }

  async findAll() {
    return await this.categoryModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
