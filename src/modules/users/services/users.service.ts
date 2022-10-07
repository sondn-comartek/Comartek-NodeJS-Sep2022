import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from '../dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities/user.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }

  async getRoleByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    return user.role;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findUserById(id: string) {
    return await this.userModel.findOne({ id });
  }

  async getUsersByBatch(userIds: string[]) {
    const users = await this.userModel.find({ id: { $in: userIds } });
    const mappedUsers = userIds.map(
      (id) =>
        users.find((user) => user.id === id) ||
        new Error(`Could not load user ${id}`),
    );
    // console.log('mappedUsers', mappedUsers);
    return mappedUsers;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return await this.userModel.findOneAndUpdate(
      { id },
      { $set: { ...updateUserInput, updatedAt: dayjs(new Date()).unix() } },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    const userExist = await this.userModel.findOne({ id });
    if (!userExist) {
      return null;
    }

    return await this.userModel.deleteOne({ id });
  }
}
