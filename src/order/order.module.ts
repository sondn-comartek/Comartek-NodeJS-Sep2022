import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../shared/schemas/order.schema';
import { OrderService } from './order.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: "order"
    }),
    MongooseModule.forFeature([{
      name: Order.name, schema: OrderSchema
    }])
  ],
  providers: [OrderResolver, OrderService],
})
export class OrderModule { }
