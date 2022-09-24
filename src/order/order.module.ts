import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../shared/schemas/order.schema';
import { OrderService } from './order.service';
import {
  Category,
  CategorySchema,
  Pet,
  PetSchema,
  Tag,
  TagSchema,
} from 'src/shared/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Pet.name,
        schema: PetSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Tag.name,
        schema: TagSchema,
      },
    ]),
    BullModule.registerQueue({
      name: 'order',
    }),
  ],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
