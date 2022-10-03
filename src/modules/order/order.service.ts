import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order, OrderDocument } from './entities/order.entity';
import { v4 as uuidV4 } from 'uuid';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}
  async create(createOrderInput: CreateOrderInput) {
    return await this.orderModel.create({ ...createOrderInput });
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(updateOrderInput: UpdateOrderInput) {
    return await this.orderModel.findByIdAndUpdate(updateOrderInput?.orderID, {
      status: updateOrderInput?.status,
    });
  }
  async findByIds(ids): Promise<Order[]> {
    return await this.orderModel.find({ _id: { $in: ids } });
  }
  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
