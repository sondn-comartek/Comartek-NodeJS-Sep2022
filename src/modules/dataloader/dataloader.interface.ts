import { Book } from "../book/model/book.model";
import { Category } from "../category/model/category.model";
import { Order } from "../order/model/order.model";
import { User } from "../user/model/user.model";
import * as DataLoader from 'dataloader';
export interface IDataloaders {
    userLoader: DataLoader<string, User>;
    orderLoader: DataLoader<string, Order>;
    categoryLoader: DataLoader<string, Category>;
    bookLoader: DataLoader<string, Book>;
}