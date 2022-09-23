import { Pet } from 'src/pet/entities/pet.entity';
import { PetService } from './../pet/pet.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order, OrderDocument } from './entities/order.entity';
import { OrderStatus } from 'src/enums/order.status';
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
      if (petsInOrder.length == 0) {
        throw new Error('order must have pets');
      }
      const price = this.priceInOrder(this.priceUnTax(petsInOrder));
      const createdOrder = await this.orderModel.create({
        pets: petsInOrder,
        shipping_date: shipping_date,
        status: status,
        price: price,
      });
      return createdOrder;
    } catch (error) {
      throw new Error(error);
    }
  }
  priceUnTax(pets: any) {
    let priceUnTax = 0;
    pets.forEach((pet) => {
      priceUnTax += pet?.price;
    });
    return { price: priceUnTax, amount: pets.length };
  }
  priceInOrder({ price, amount }) {
    // price have tax in order
    let tax = 1;
    if (amount <= 1) {
      tax = 1.1;
    }
    if (amount > 1 && amount < 5) {
      tax = 1.08;
    }
    if (amount >= 5 && amount < 10) {
      tax = 1.05;
    }
    if (amount >= 10) {
      tax = 1.155; // tax 10% and discount 5%
    }
    return (parseFloat(price) * tax).toFixed(2);
  }
  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(updateOrderInput: UpdateOrderInput) {
    const { orderID, status: orderStatus } = updateOrderInput;
    try {
      const orderByStatus = await this.orderModel.findOne({ _id: orderID });
      if (orderByStatus?.status == OrderStatus.placed) {
        return await this.orderModel.findByIdAndUpdate(orderID, {
          status: orderStatus,
        });
      }
      throw new Error(
        `Order is ${orderByStatus?.status} can not change status`,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
