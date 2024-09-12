import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { BookModule } from "src/modules/book/book.module";
import { UserModule } from "src/modules/user/user.module";
import { orderSchema } from "./model/order.model";
import { OrderResolver } from "./order.resolver";
import { OrderService } from "./order.service";
@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Order", schema: orderSchema }]),
        UserModule,
        BookModule,
        ClientsModule.register([
            {
                name: 'NOTIFY_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqps://uieefmny:7ebeJ-axFSHyvo79IdWqumu1hd0M8hzX@moose.rmq.cloudamqp.com/uieefmny'],
                    queue: 'notify_queue',
                    queueOptions: {
                        durable: false
                    },
                },
            },
        ]),
    ],
    providers: [OrderService, OrderResolver],
    exports: [OrderService]
})
export class OrderModule { }