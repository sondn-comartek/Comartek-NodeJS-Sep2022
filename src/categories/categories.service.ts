import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HelpersService } from 'src/helpers/helpers.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectQueue('category') private categoryQueue: Queue,
    private readonly booksService: BooksService,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    try {
      const { name, image, widthImage } = createCategoryInput;
      const categoryExist = await this.categoryModel.findOne({ name });
      if (categoryExist) return new Error(`Category ${name} already exists`);

      const { createReadStream, filename } = await image;

      createReadStream()
        .pipe(
          createWriteStream(
            join(process.cwd(), `./src/upload/categories/origin/${filename}`),
          ),
        )
        .on('finish', async () => {
          await this.categoryQueue.add(
            'convertCategoryImage',
            {
              input:
                process.cwd() +
                `\\src\\upload\\categories\\origin\\${filename}`,
              outputThumb:
                process.cwd() +
                `\\src\\upload\\categories\\thumb\\${name}_thumb.webp`,
              outputPreview:
                process.cwd() +
                `\\src\\upload\\categories\\preview\\${name}_preview.webp`,
              outputCustom:
                process.cwd() +
                `\\src\\upload\\categories\\custom\\${name}_custom_w${widthImage}.jpg`,
              widthImage,
            },
            { delay: 3000 },
          );

          return true;
        })
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });

      return await new this.categoryModel({
        ...createCategoryInput,
        image: filename,
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
