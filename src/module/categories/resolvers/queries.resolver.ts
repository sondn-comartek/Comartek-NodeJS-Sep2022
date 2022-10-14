import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Book } from 'src/module/books/entities/book.entity';
import { CategoriesService } from '../categories.service';
import { Category } from '../entities/category.entity';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { CategoryBookLoader } from 'src/module/loader/loader.category-book';
import { BooksService } from 'src/module/books/books.service';
import { CategoryStatistic } from '../entities/category-statistic.entity';

@Resolver(() => Category)
export class CategoryQueryResolver {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly booksService: BooksService
    ) { }

    @Query(() => [Category])
    getAllCategories(
        @Args('limit') limit: number,
        @Args('offset') offset: number
    ) {
        return this.categoriesService.findAll(offset, limit);
    }

    @ResolveField(() => [Book], { name: 'books' })
    async getAllBookOfCategory(
        @Parent() category: Category,
        @Loader(CategoryBookLoader) categoryBookLoader: DataLoader<Category['_id'], Book>
    ) {
        return await categoryBookLoader.load(category._id);
    }

    @ResolveField(() => CategoryStatistic, { name: 'statistics' })
    async getStatisticsOfCategory(
        @Parent() category: Category
    ): Promise<CategoryStatistic> {
        return this.booksService.countBookInfo(category._id);
    }

    @Query(() => Category, { name: 'category' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.categoriesService.findOne(id);
    }
}
