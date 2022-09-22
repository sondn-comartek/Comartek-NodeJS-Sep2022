import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../shared/schemas/category.schema';
import { CreateCategoryInput } from '../shared/inputs';
import { Model } from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categorySchema: Model<Category>,
  ) {}

  async createCategory(createCategoryInput: CreateCategoryInput) {
    const { name } = createCategoryInput;

    const existedName = await this.findCategoryByName(name);
    if (existedName) {
      throw new ConflictException('Category đã tồn tại');
    }

    return await this.categorySchema.create(createCategoryInput);
  }

  async findCategoryByName(name: string): Promise<Category> {
    return await this.categorySchema.findOne({ name });
  }

  async findCategoryById(id: string): Promise<Category> {
    return await this.categorySchema.findOne({ id });
  }

  async deleteCategoryById(id: string): Promise<Category> {
    const category = await this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }

    return await this.categorySchema.findOneAndRemove({ id }, { new: true });
  }

  async findAllCategory(): Promise<Category[]> {
    return await this.categorySchema.find({});
  }

  async updateCategoryById(
    id: string,
    updateCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    const { name } = updateCategoryInput;

    const category = await this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }

    if (category.name === name) {
      return category;
    }

    if (await this.findCategoryByName(name)) {
      throw new ConflictException(`Category ${name} đã tồn tại`);
    }

    return await this.categorySchema.findOneAndUpdate(
      { id },
      { $set: updateCategoryInput },
    );
  }

  async updateCategoryByName(
    name: string,
    updateCategoryInput: CreateCategoryInput,
  ): Promise<string> {
    const category = await this.findCategoryByName(name);
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }

    const inputName = updateCategoryInput.name;

    if (category.name === inputName) {
      return 'Update category thành công';
    }

    if (await this.findCategoryByName(inputName)) {
      throw new ConflictException(`Category ${inputName} đã tồn tại`);
    }

    await this.categorySchema.updateOne(
      { name },
      { $set: updateCategoryInput },
    );

    return `Update category thành công`;
  }
}
