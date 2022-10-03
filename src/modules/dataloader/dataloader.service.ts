import { Injectable } from "@nestjs/common";
import { BookService } from "../book/book.service";
import { CategoryService } from "../category/category.service";
import { OrderService } from "../order/order.service";
import { User } from "../user/model/user.model";
import { UserService } from "../user/user.service";
import { IDataloaders } from "./dataloader.interface";
import * as DataLoader from 'dataloader';
import { Book } from "../book/model/book.model";
import { Category } from "../category/model/category.model";
import { Order } from "../order/model/order.model";
@Injectable()
export class DataLoaderService {
    constructor(
        private readonly userService: UserService,
        private readonly orderService: OrderService,
        private readonly categoryService: CategoryService,
        private readonly bookService: BookService,
    ) { }

    createLoaders(): IDataloaders {
        const userLoader = new DataLoader<string, User>(
            async (keys: readonly string[]) => await this.userService.findUserByIds(keys as string[])
        );

        const bookLoader = new DataLoader<string, Book>(
            async (keys: readonly string[]) => await this.bookService.findBooksByIds(keys as string[])
        )



        const categoryLoader = new DataLoader<string, Category>(
            async (keys: readonly string[]) => await this.categoryService.findCategoryByIds(keys as string[])
        )

        const orderLoader = new DataLoader<string, Order>(
            async (keys: readonly string[]) => await this.orderService.findOrderByIds(keys as string[])
        )
        return {
            userLoader,
            bookLoader,
            categoryLoader,
            orderLoader
        };
    }



}