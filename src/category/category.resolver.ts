import { Args, Mutation, Resolver, Int, Query } from '@nestjs/graphql';
import { Category } from '../shared/schemas';
import { CreateCategoryInput } from '../shared/inputs/create-category.input';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) { }

    @Mutation(() => Category)
    async createCategory(@Args({ name: "createCategoryInput", type: () => CreateCategoryInput }) createCategoryInput: CreateCategoryInput) {
        return await this.categoryService.createCategory(createCategoryInput)
    }

    @Query(() => Category)
    async findCategoryByName(@Args({ name: "name", type: () => String }) name: string) {
        return await this.categoryService.findCategoryByName(name)
    }

    @Query(() => Category)
    async findCategoryById(@Args({ name: "id", type: () => String }) id: string) {
        return await this.categoryService.findCategoryById(id)
    }

    @Mutation(() => String || Category)
    async deleteCategoryById(@Args({ name: "id", type: () => String }) id: string) {
        return await this.categoryService.deleteCategoryById(id)
    }

    @Query(() => [Category])
    async findAllCategory() {
        return await this.categoryService.findAllCategory()
    }

    @Mutation(() => Category)
    async updateCategory(@Args({ name: "updateCategoryInput", type: () => CreateCategoryInput }) updateCategoryInput: CreateCategoryInput) {
        return await this.categoryService.updateCategory(updateCategoryInput)
    }
}
