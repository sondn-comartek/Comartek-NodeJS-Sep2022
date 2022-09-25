import {
  Injectable,
  ForbiddenException,
  NotFoundException,
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

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderSchema: Model<Order>,
    @InjectModel(User.name) private readonly userSchema: Model<User>,
    @InjectModel(Pet.name) private readonly petSchema: Model<Pet>,
    @InjectQueue('order') private readonly orderQueue: Queue,
  ) { }

  // return an object with order id, pets, status
  async createOrder(userId: string, createOrderInput: CreateOrderInput): Promise<OrderResponseType> {
    const isActiveUser = await this.userSchema.findOne({
      _id: userId,
      status: UserStatus.Active,
    });
    if (!isActiveUser) {
      throw new ForbiddenException(
        'Please active your account before creating an order',
      );
    }

    const { petsId } = createOrderInput
    const pets = await this.petSchema.find({ _id: { $in: petsId } })
    console.log({ pets })
    if (pets.length === 0) {
      throw new NotFoundException("Pet does not exist")
    }

    const order = await this.orderSchema.create({ userId, ...createOrderInput })

    const petsResponse: PetResponseType[] = pets.map(function (pet): PetResponseType {
      return {
        _id: pet._id.toString(),
        name: pet.name,
        price: pet.price,
        photos: []
      }
    })

    return {
      _id: order._id.toString,
      pets: petsResponse,
      ...order.toObject(),
    };
  }
}
