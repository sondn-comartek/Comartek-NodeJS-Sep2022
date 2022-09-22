import { User, UserDocument } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserInput: CreateUserInput) {
    const hashPassword = await this.hashPassword(createUserInput?.password);
    const createdUser = await this.userModel.create({
      ...createUserInput,
      password: hashPassword,
    });
    return createdUser;
  }
  async hashPassword(password): Promise<String> {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async findByEmail(email: String): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email: email });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
