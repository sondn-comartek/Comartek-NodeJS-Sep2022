import { Module } from "@nestjs/common";
import { BookModule } from "../book/book.module";
import { CategoryModule } from "../category/category.module";
import { OrderModule } from "../order/order.module";
import { UserModule } from "../user/user.module";
import { DataLoaderService } from "./dataloader.service";

@Module({
    providers: [DataLoaderService],
    imports: [UserModule, OrderModule, CategoryModule, BookModule],
    exports: [DataLoaderService],
})
export class DataloaderModule { }