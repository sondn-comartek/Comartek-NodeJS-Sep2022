import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category, CategoryDocument } from './entities/category.entity';
import * as Resize from '../helper/image.resize';
import { finished } from 'stream/promises';

import * as sharp from 'sharp';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel = Model<CategoryDocument>,
  ) {}
  async create(createCategoryInput: CreateCategoryInput) {
    const { createReadStream, filename } = await createCategoryInput?.image;
    const pathImage = `${process.env.PATH_IMAGE_SAVE_CATEGORY}${filename}`;
    const stream = await createReadStream();
    const out = await createWriteStream(pathImage);
    await stream.pipe(out);
    await finished(out);
    const pathFile = await Resize.categoryResize(pathImage);
    await unlink(pathImage);
    delete createCategoryInput.image;
    const dataInsert = { ...createCategoryInput, photo_urls: pathFile };
    const createdCategory = await this.categoryModel.create(dataInsert);
    return createdCategory;
  }
  findAll() {
    return `This action returns all category`;
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
