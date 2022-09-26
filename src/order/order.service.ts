import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  NotAcceptableException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../shared/schemas/order.schema';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateOrderInput } from '../shared/inputs/create-order.input';
import { User } from '../shared/schemas/user.schema';
import { UserStatus } from '../shared/enums/user-status.enum';
import { Pet } from '../shared/schemas/pet.schema';
import { PetStatus } from '../shared/enums/pet-status.enum';
import { OrderResponseType } from '../shared/types/order-response.type';
import { UserResponseType } from '../shared/types/user-response.type';
import { PetResponseType } from '../shared/types/pet-response.type';
import { OrderStatus } from 'src/shared/enums';
import { UpdateOrderStatusInput } from 'src/shared/inputs/update-order-status.input';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderSchema: Model<Order>,
    @InjectModel(User.name) private readonly userSchema: Model<User>,
    @InjectModel(Pet.name) private readonly petSchema: Model<Pet>,
    @InjectQueue('order') private readonly orderQueue: Queue,
  ) {}

  // return an object with order id, pets, status
  async createOrder(
    userId: string,
    createOrderInput: CreateOrderInput,
  ): Promise<OrderResponseType> {
    const isActiveUser = await this.userSchema.findOne({
      _id: userId,
      status: UserStatus.Active,
    });
    if (!isActiveUser) {
      throw new ForbiddenException(
        'Please active your account before creating an order',
      );
    }

    const { petsId } = createOrderInput;
    const pets = await this.petSchema.find({ _id: { $in: petsId } });
    if (pets.length === 0) {
      throw new NotFoundException('Pet does not exist');
    }

    let price = 0;
    pets.forEach((pet) => {
      console.log(pet.price);
      price += pet.price;
    });
    price += 50; // default shipping price is total of pet's price + 50$, then be updated later

    console.log({ price, type: typeof price });

    const order = await this.orderSchema.create({
      userId,
      ...createOrderInput,
      price,
    });

    const petsResponse: PetResponseType[] = pets.map(function (
      pet,
    ): PetResponseType {
      return {
        _id: pet._id.toString(),
        name: pet.name,
        price: pet.price,
        photos: [],
      };
    });

    // Not working ???
    await this.orderQueue.add('handleCreateOrder', {
      order,
    });

    return {
      _id: order._id.toString,
      pets: petsResponse,
      ...order.toObject(),
      price,
    };
  }

  async updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<string> {
    const order = await this.orderSchema.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found to be update');
    }

    if (order.status !== OrderStatus.Placed) {
      throw new NotAcceptableException('Only placed order can be update');
    }

    const { status } = updateOrderStatusInput;
    if (status !== OrderStatus.Approved && status !== OrderStatus.Delivered) {
      throw new BadRequestException('Order status input is not valid');
    }

    await this.orderSchema.findByIdAndUpdate(id, {
      $set: updateOrderStatusInput,
    });

    return 'Update order success';
  }

  async findOrderById(id: string): Promise<OrderResponseType> {
    const order = await this.orderSchema.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found to be update');
    }

    const petsResponse: PetResponseType[] = [];
    for (const petId of order.petsId) {
      const pet = await this.petSchema.findById(petId);
      const petResponse: PetResponseType = {
        _id: pet._id.toString(),
        name: pet.name,
        price: pet.price,
        photos: [],
      };
      petsResponse.push(petResponse);
    }

    return {
      _id: order._id.toString(),
      pets: petsResponse,
      ...order.toObject(),
    };
  }

  async deleteOrder(id: string): Promise<string> {
    const validOrderStatus = [OrderStatus.Approved, OrderStatus.Delivered];
    const order = await this.orderSchema.find({
      _id: id,
      status: { $not: { $in: validOrderStatus } },
    });
    if (!order) {
      throw new NotFoundException('Order not found to delete');
    }

    await this.orderSchema.deleteOne({ _id: id });

    return 'Delete order success';
  }
}
