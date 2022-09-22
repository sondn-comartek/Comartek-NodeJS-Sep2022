import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../shared/schemas/user.schema';
import { CreateUserInput } from '../shared/inputs/create-user.input';
import { UpdateUserInput } from '../shared/inputs/update-user.input';
import { PasswordService } from 'src/password/password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userSchema: Model<User>,
    private readonly passwordService: PasswordService,
  ) { }

  async getAllUser() {
    return await this.userSchema.find();
  }

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
    let userName = updateUserInput?.userName;
    let email = updateUserInput?.email;
    let password = updateUserInput?.password;

    const user = await this.getUserById(id);
    if (!user) {
      return `User không tồn tại`;
    }

    if (userName) {
      const existedUserName = await this.getUserByUserName(userName);
      if (existedUserName) {
        return `Tên người dùng ${userName} đã được sử dụng`;
      }
      userName = userName.toLowerCase()
    }

    if (email) {
      const registeredEmail = await this.getUserByEmail(email);
      if (registeredEmail) {
        return `Email ${email} đã được sử dụng`;
      }
      email = email.toLowerCase()
    }

    if (password) {
      password = await this.passwordService.encryptPassword(password)
    }

    await this.userSchema.updateOne(
      { id },
      {
        $set: {
          ...updateUserInput,
          userName,
          email,
          password,
        },
      },
    );

    return 'Update user thành công';
  }

  async deleteUserById(id: string) {
    const user = await this.getUserById(id);
    if (!user) {
      return `User không tồn tại`;
    }

    await this.userSchema.deleteOne({ id });

    return `Xóa user thành công`;
  }
}
