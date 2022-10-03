import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookModule } from "src/modules/book/book.module";
import { UserModule } from "src/modules/user/user.module";
import { orderSchema } from "./model/order.model";
import { OrderService } from "./order.service";
@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Order", schema: orderSchema }]),
        UserModule,
        BookModule
    ],
    providers: [OrderService],
    exports: [OrderService]
})
export class OrderModule { }