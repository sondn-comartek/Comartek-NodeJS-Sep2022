import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderS, OrderSDocument } from './entities/order.entity';
import { v4 as uuidV4 } from 'uuid';
import { User } from '../user/entities/user.entity';
import { BookService } from '../book/book.service';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderS.name) private orderModel: Model<OrderSDocument>,
    private bookService: BookService,
  ) {}
  async create(createOrderInput: CreateOrderInput) {
    const isBookValid = await this.bookService.bookReadyToBorrow(
      createOrderInput?.bookID,
    );
    if (isBookValid) {
      return await this.orderModel.create({ ...createOrderInput });
    }
    throw Error('book is unavailable');
  }

  async findAll() {
    return await this.orderModel.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  async update(updateOrderInput: UpdateOrderInput) {
    return await this.orderModel.findByIdAndUpdate(updateOrderInput?.orderID, {
      status: updateOrderInput?.status,
    });
  }
  async findByIds(ids) {
    return await this.orderModel.find({ userID: { $in: ids } });
  }
  async findByCondition(condition: any) {
    const orders = await this.orderModel.find({ condition });
    return orders;
  }
  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
