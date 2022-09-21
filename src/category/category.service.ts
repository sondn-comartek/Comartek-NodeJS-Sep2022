import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../shared/schemas/category.schema';
import { CreateCategoryInput } from '../shared/inputs';
import { Model } from 'mongoose';

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
      return {
        message: `Category with name ${name} already existed`,
      };
    }

    return await this.categorySchema.create(createCategoryInput);
  }

  async findCategoryByName(name: string): Promise<Category> {
    return await this.categorySchema.findOne({ name });
  }

  async findCategoryById(id: string): Promise<Category> {
    return await this.categorySchema.findOne({ id });
  }

  async deleteCategoryById(id: string): Promise<string> {
    const category = await this.findCategoryById(id);
    if (category) {
      await this.categorySchema.findOneAndRemove({ id });

      return `Delete category with id ${id} successfully`;
    }

    return `Category with id ${id} does not exist`;
  }

  async findAllCategory(): Promise<Category[]> {
    return await this.categorySchema.find({});
  }

  async updateCategoryById(
    id: string,
    updateCategoryInput: CreateCategoryInput,
  ) {
    const category = await this.findCategoryById(id);
    if (category) {
      await this.categorySchema.updateOne(
        { id },
        { $set: updateCategoryInput },
      );
      return `Update category with id ${id}successfully`;
    }

    return `Category with id ${id} does not exist`;
  }

  async updateCategoryByName(
    name: string,
    updateCategoryInput: CreateCategoryInput,
  ) {
    const category = await this.findCategoryByName(name);
    if (category) {
      await this.categorySchema.updateOne(
        { name },
        { $set: updateCategoryInput },
      );

      return `Update category ${name} successfully`;
    }

    return `Category ${name} does not exist`;
  }
}
