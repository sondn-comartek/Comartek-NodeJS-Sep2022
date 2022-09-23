import { PetService } from './../pet/pet.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private petService: PetService,
  ) {}
  async create(createOrderInput: CreateOrderInput) {
    const { pets, shipping_date, status } = createOrderInput;
    try {
      const petsInOrder = await this.petService.findPetsCustomerOrderByIds(
        pets,
      );
      const createdOrder = await this.orderModel.create({
        pets: petsInOrder,
        shipping_date: shipping_date,
        status: status,
      });
      return createdOrder;
    } catch (error) {
      throw new Error(error);
    }
  }
  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
