import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category, CategoryDocument } from './entities/category.entity';
import * as Resize from '../../helper/image.resize';
import { finished } from 'stream/promises';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel = Model<CategoryDocument>,
  ) {}
  async create(createCategoryInput: CreateCategoryInput) {
    return await this.categoryModel.create({ ...createCategoryInput });
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
