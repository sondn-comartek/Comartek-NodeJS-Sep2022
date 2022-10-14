import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly category: Model<Category>,
    @InjectQueue('uploadImage') private uploadImageQueue: Queue
  ) { }

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const { categoryName, image } = createCategoryInput;
    const filename = (await image).filename;
    const existedCategory = await this.category.findOne({ categoryName: categoryName });
    if (existedCategory) {
      throw new Error(`Category with name ${categoryName} is existed. Can not create new category`);
    }

    delete createCategoryInput.image;
    const regex = /.png|.jpg|.jpeg/g;
    let newFilename = filename.replace(regex, '.webp');
    createCategoryInput['imageUrl'] = join(process.cwd(), `./public/images/categories/${newFilename}`);

    const newCategory = {
      ...createCategoryInput
    }

    const createdCategory = await this.category.create(newCategory);

    if (!createdCategory) {
      throw new HttpException('Error in create a new category', HttpStatus.BAD_REQUEST);
    }
    return createdCategory;
  }

  async findById(id: string) {
    const category = await this.category.findById(id);
    if (!category) {
      throw new HttpException(`Category with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return category;
  }

  findAll(offset: number, limit: number) {
    const categoryList = this.category.find().skip(offset).limit(limit);
    if (!categoryList) {
      throw new HttpException('Error in get all categories', HttpStatus.BAD_REQUEST);
    }
    return categoryList;
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
