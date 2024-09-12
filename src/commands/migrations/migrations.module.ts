import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, bookSchema } from "src/modules/book/model/book.model";
import { Category, categorySchema } from "src/modules/category/model/category.model";
import { Order, orderSchema } from "src/modules/order/model/order.model";
import { User, UserSchema } from "src/modules/user/model/user.model";
import { Migration } from "./migrations.command";
import { MigrationSchema } from "./migrations.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Migration', schema: MigrationSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Book.name, schema: bookSchema }]),
        MongooseModule.forFeature([{ name: Category.name, schema: categorySchema }]),
        MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }]),
    ],
    providers: [Migration]
})
export class MigrationModule { }