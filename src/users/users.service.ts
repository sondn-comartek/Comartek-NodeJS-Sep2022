import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

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

  // async findAll() {
  //   return await this.userModel.find();
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return await this.userModel.findOneAndUpdate(
      { id },
      { $set: { ...updateUserInput } },
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
