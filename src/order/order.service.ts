import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../shared/schemas/order.schema';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateOrderInput } from '../shared/inputs/create-order.input';
import { User } from '../shared/schemas/user.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderSchema: Model<Order>,
    @InjectModel(User.name) private readonly useSchema: Model<User>,
    @InjectQueue('order') private readonly orderQueue: Queue,
  ) { }

  async createOrder(userId: string, createOrderInput: CreateOrderInput) {
    const { petsId } = createOrderInput
  }
}
