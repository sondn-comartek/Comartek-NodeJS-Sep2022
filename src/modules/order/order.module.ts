import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { OrderSchema } from './model/order.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
    [
      {
        name: 'order', schema: OrderSchema
      }
  ]),],
  providers: [OrderResolver, OrderService],
  exports: [OrderService]
})
export class OrderModule {}
