import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet, PetDocument } from 'src/pets/schemas/pet.schema';
import { ApproveOrderInput } from './dto/approve-order.input';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Pet.name)
    private readonly petModel: Model<PetDocument>,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    try {
      const { petsId } = createOrderInput;
      const countItem = petsId.length;
      let salesTax: number;
      if (countItem == 1) {
        salesTax = 0.1;
      } else if (countItem < 5) {
        salesTax = 0.08;
      } else if (countItem < 10) {
        salesTax = 0.05;
      }

      let price: number;
      price = 0;
      for (let i = 0; i < countItem; i++) {
        const pet = await this.petModel.findOne({ id: petsId[i] });
        console.log('price pet in loop : ', pet.price);
        price += pet.price;
      }

      price = price * (1 + salesTax);

      const shipDate = new Date();
      shipDate.setDate(shipDate.getDate() + 5);

      return await new this.orderModel({
        ...createOrderInput,
        price,
        shipDate,
      }).save();
    } catch (e) {
      throw e;
    }
  }

  // findAll() {
  //   return `This action returns all orders`;
  // }

  async findById(id: string) {
    return await this.orderModel.findOne({ id });
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  async approveOrder(id: string, approveOrderInput: ApproveOrderInput) {
    try {
      const order = await this.orderModel.findOne({ id });
      if (order.status != 'placed') return;
      return await this.orderModel.findOneAndUpdate(
        { id },
        { $set: { ...approveOrderInput } },
        {
          new: true,
        },
      );
    } catch (e) {
      throw e;
    }
  }

  async remove(id: string) {
    try {
      const orderExist = await this.orderModel.findOne({ id });
      if (!orderExist) {
        return;
      }

      if (orderExist.status != 'placed') return;

      return await this.orderModel.deleteOne({ id });
    } catch (e) {
      throw e;
    }
  }
}
