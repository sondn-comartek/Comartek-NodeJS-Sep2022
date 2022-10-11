import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderDocument } from './model/order.schema';
import { OrderModule } from './order.module';

@Injectable()
export class OrderService {
  constructor(@InjectModel('order') private orderModel: Model<OrderDocument>){}
  getOrderModel() {
    return this.orderModel;
  }
}
