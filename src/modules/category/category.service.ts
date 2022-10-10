import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "./model/category.model";
import * as mongoose from 'mongoose'
@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }
    async createCategory(name: string) {
        const category = await this.categoryModel.create({ name })

        return category
    }

    async findCategoryById(id: string) {
        return await this.categoryModel.findById(id)
    }

    async findCategoryByIds(ids: readonly string[]) {
        const categories = await this.categoryModel.find({ _id: { $in: ids } })
        const mappedCategories = ids.map(
            (id) =>
                categories.find((category) => category.id === id) ||
                new Error(`Could not load user ${id}`),
        );
        // console.log('mappedUsers', mappedUsers);
        return mappedCategories;
    }

    async findCategoryByIDs(ids: readonly string[]) {
        return await this.categoryModel.find({ _id: { $in: ids } })
    }
}