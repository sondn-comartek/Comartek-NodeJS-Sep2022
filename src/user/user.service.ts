import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../shared/schemas/user.schema';
import { CreateUserInput } from '../shared/inputs/create-user.input';
import { UpdateUserInput } from '../shared/inputs/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userSchema: Model<User>,
  ) {}

  async createNewUser(createUserInput: CreateUserInput): Promise<User> {
    return await this.userSchema.create(createUserInput);
  }

  async getUserById(id: string): Promise<User> {
    return await this.userSchema.findOne({ id });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userSchema.findOne({ email: email.toLowerCase() });
  }

  async getUserByUserName(userName: string): Promise<User> {
    return await this.userSchema.findOne({ userName: userName.toLowerCase() });
  }

  async updateUserById(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.getUserById(id);
    if (!user) {
      return `User with id ${id} does not exist`;
    }

    return await this.userSchema.updateOne(
      { id },
      { $set: updateUserInput },
      { new: true },
    );
  }

  async deleteUserById(id: string) {
    const user = await this.getUserById(id);
    if (!user) {
      return `User with id ${id} does not exist`;
    }

    await this.userSchema.deleteOne({ id });

    return `Delete user with id ${id} successfully`;
  }
}
