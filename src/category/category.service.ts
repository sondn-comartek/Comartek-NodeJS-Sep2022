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

  async createCategory(createCategoryInput: CreateCategoryInput): Promise<CategoryResponseType> {
    const { name } = createCategoryInput;

    const existedName = await this.findCategoryByName(name);
    if (existedName) {
      throw new ConflictException('Category đã tồn tại');
    }

    const category = await this.categorySchema.create(createCategoryInput);

    return new CategoryResponseType(category._id.toString(), category.name)
  }

  async findCategoryByName(name: string): Promise<Category> {
    return await this.categorySchema.findOne({ name });
  }

  async findCategoryById(id: string): Promise<Category> {
    return await this.categorySchema.findById(id);
  }

  async deleteCategoryById(id: string): Promise<Category> {
    const category = await this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }

    const deletedCategory = await this.categorySchema.findOneAndRemove({ _id: id }, { new: true });
    return new CategoryResponseType(deletedCategory._id.toString(), deletedCategory.name)
  }

  async findAllCategory(): Promise<CategoryResponseType[]> {
    const categories = await this.categorySchema.find({})
    let response: CategoryResponseType[] = [];

    categories.forEach(category => {
      const responseCategory = new CategoryResponseType(category._id.toString(), category.name)
      response.push(responseCategory)
    });

    return response
  }

  async updateCategoryById(
    id: string,
    updateCategoryInput: CreateCategoryInput,
  ): Promise<CategoryResponseType> {
    const { name } = updateCategoryInput;

    const category = await this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }

    if (category.name === name) {
      throw new ConflictException("Tên đã sử dụng trước đó")
    }

    if (await this.findCategoryByName(name)) {
      throw new ConflictException(`Category ${name} đã tồn tại`);
    }

    const updatedCategory = await this.categorySchema.findOneAndUpdate(
      { _id: id },
      { $set: updateCategoryInput },
      { new: true }
    );

    return new CategoryResponseType(updatedCategory._id.toString(), updatedCategory.name)
  }

  // async updateCategoryByName(
  //   name: string,
  //   updateCategoryInput: CreateCategoryInput,
  // ): Promise<string> {
  //   const category = await this.findCategoryByName(name);
  //   if (!category) {
  //     throw new NotFoundException('Category không tồn tại');
  //   }

  //   const inputName = updateCategoryInput.name;

  //   if (category.name === inputName) {
  //     return 'Update category thành công';
  //   }

  //   if (await this.findCategoryByName(inputName)) {
  //     throw new ConflictException(`Category ${inputName} đã tồn tại`);
  //   }

  //   await this.categorySchema.updateOne(
  //     { name },
  //     { $set: updateCategoryInput },
  //   );

  //   return `Update category thành công`;
  // }
}
