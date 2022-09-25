import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../shared/schemas/category.schema';
import { CreateCategoryInput } from '../shared/inputs';
import { Model } from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CategoryResponseType } from '../shared/types/category-response.type';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categorySchema: Model<Category>,
  ) { }

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<CategoryResponseType> {
    const { name } = createCategoryInput;

    const existedName = await this.findCategoryByName(name);
    if (existedName) {
      throw new ConflictException('Category đã tồn tại');
    }

    const category = await this.categorySchema.create(createCategoryInput);

    return {
      _id: category._id.toString(),
      name: category.name
    };
  }

  async findCategoryByName(name: string): Promise<Category> {
    return await this.categorySchema.findOne({ name });
  }

  async findCategoryById(id: string): Promise<Category> {
    return await this.categorySchema.findById(id).exec();
  }

  async deleteCategoryById(id: string): Promise<string> {
    const category = await this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }

    await this.categorySchema.findOneAndRemove({ _id: id }, { new: true });

    return 'DELETE CATEGORY SUCCESS';
  }

  async findAllCategory(): Promise<CategoryResponseType[]> {
    const categories = await this.categorySchema.find({});
    const categoriesResponse: CategoryResponseType[] = categories.map(function (category): CategoryResponseType {
      return {
        _id: category._id.toString(),
        name: category.name
      }
    });

    return categoriesResponse;
  }

  async updateCategoryById(
    id: string,
    updateCategoryInput: CreateCategoryInput,
  ): Promise<string> {
    const { name } = updateCategoryInput;

    const category = await this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }

    if (category.name === name) {
      throw new ConflictException('Tên đã sử dụng trước đó');
    }

    if (await this.categorySchema.findOne({ name })) {
      throw new ConflictException(`Category ${name} đã tồn tại`);
    }

    const updatedCategory = await this.categorySchema.findOneAndUpdate(
      { _id: id },
      { $set: updateCategoryInput },
      { new: true },
    );

    return 'UPDATE CATEGORY SUCCESS';
  }
}
