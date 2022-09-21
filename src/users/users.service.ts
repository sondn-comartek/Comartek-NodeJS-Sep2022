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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
