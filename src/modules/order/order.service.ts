import { OrderStatus } from './enums/order.enum';
import { NotificationService } from './../notification/notification.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderS, OrderSDocument } from './entities/order.entity';
import { BookService } from '../book/book.service';
import { BookStatus } from '../book/enums/status.enum';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderS.name) private orderModel: Model<OrderSDocument>,
    private bookService: BookService,
    private notificationService: NotificationService,
  ) {}
  async create(createOrderInput: CreateOrderInput) {
    const isBookValid = await this.bookService.bookReadyToBorrow(
      createOrderInput?.bookID,
    );
    if (isBookValid.length != 0) {
      const changeStatus = await this.bookService.changeStatusBook(
        createOrderInput.bookID,
        BookStatus.unavailable,
      );
      const createdOrder = await this.orderModel.create({
        ...createOrderInput,
      });
      return createdOrder;
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
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      updateOrderInput?.orderID,
      {
        status: updateOrderInput?.status,
      },
    );
    let statusUpdate = 0;
    if (
      updateOrderInput?.status == OrderStatus.pending ||
      updateOrderInput?.status == OrderStatus.ignore
    ) {
      statusUpdate = BookStatus.available;
    } else {
      statusUpdate = BookStatus.unavailable;
    }
    await this.bookService.changeStatusBook(updatedOrder?.bookID, statusUpdate);
    return updatedOrder;
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
