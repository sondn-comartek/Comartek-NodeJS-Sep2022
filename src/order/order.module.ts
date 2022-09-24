import { PetModule } from './../pet/pet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order, OrderSchema } from './entities/order.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]), PetModule],
  providers: [OrderResolver, OrderService]
})
export class OrderModule {}
