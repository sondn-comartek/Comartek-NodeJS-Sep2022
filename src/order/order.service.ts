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

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderSchema: Model<Order>,
    @InjectModel(User.name) private readonly userSchema: Model<User>,
    @InjectModel(Pet.name) private readonly petSchema: Model<Pet>,
    @InjectQueue('order') private readonly orderQueue: Queue,
  ) {}

  async createOrder(userId: string, createOrderInput: CreateOrderInput) {
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
    const pets = await this.petSchema.find({
      _id: { $in: petsId },
      status: PetStatus.Available,
    });
    if (pets.length === 0) {
      throw new NotFoundException(
        'Pet không tồn tại hoặc đã được đặt chỗ / bán',
      );
    }

    return 'create order';
  }
}
