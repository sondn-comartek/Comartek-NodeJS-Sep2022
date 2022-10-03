import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderS, OrderSchema } from './entities/order.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderS.name, schema: OrderSchema }]),
  ],
  providers: [OrderResolver, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
