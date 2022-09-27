import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserInput: CreateUserInput) {
    try {
      const createdUser = await this.userModel.create({
        ...createUserInput,
        password: await this.hashPassword(createUserInput?.password),
      });
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async hashPassword(password): Promise<String> {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
  async comparePassword(candidatePassword, password): Promise<boolean> {
    let isMatch = false;
    isMatch = await bcrypt.compare(candidatePassword, password);
    return isMatch;
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(email: string) {
    return this.userModel.findOne({ email: email });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
