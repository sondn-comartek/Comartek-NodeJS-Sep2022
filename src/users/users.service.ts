import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async hashPassword(password: string) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (e) {
      throw e;
    }
  }

  async create(createUserInput: CreateUserInput) {
    try {
      const { username } = createUserInput;
      const userExist = await this.userModel.findOne({ username });
      if (userExist) {
        return null;
      }
      const { password } = createUserInput;
      const hashedPassword = await this.hashPassword(password);
      return await new this.userModel({
        ...createUserInput,
        password: hashedPassword,
      }).save();
    } catch (e) {
      throw e;
    }
  }

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
