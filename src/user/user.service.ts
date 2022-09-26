import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../shared/schemas/user.schema';
import { CreateUserInput } from '../shared/inputs/create-user.input';
import { UpdateUserInput } from '../shared/inputs/update-user.input';
import { PasswordService } from 'src/password/password.service';
import { UserResponseType } from '../shared/types/user-response.type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userSchema: Model<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async getAllUser(): Promise<User[]> {
    return await this.userSchema.find({});
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

  async getUserByUserName(userName: string): Promise<UserResponseType> {
    const user = await this.userSchema.findOne({
      userName: userName.toLowerCase(),
    });
    if (!user) {
      throw new NotFoundException('USER NOT FOUND');
    }

    const userResponse: UserResponseType = {
      _id: user._id.toString(),
      ...user.toObject(),
    };

    return userResponse;
  }

  async updateUserById(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<string> {
    let userName = updateUserInput?.userName;
    let email = updateUserInput?.email;
    let password = updateUserInput?.password;

    const user = await this.userSchema.findById(id);
    if (!user) {
      throw new NotFoundException('USER NOT FOUND');
    }

    if (userName) {
      switch (user.userName === userName.toLowerCase()) {
        case true:
          break;

        default:
          const existedUserName = await this.userSchema.findOne({ userName });
          if (existedUserName) {
            throw new ConflictException('Tên người dùng đã được sử dụng');
          }

          break;
      }

      userName = userName.toLowerCase();
    }

    if (email) {
      switch (user.email === email.toLowerCase()) {
        case true:
          break;

        default:
          const existedEmail = await this.userSchema.findOne({ email });
          if (existedEmail) {
            throw new ConflictException('Email đã được sử dụng');
          }

          break;
      }

      email = email.toLowerCase();
    }

    if (password) {
      password = await this.passwordService.encryptPassword(password);
    }

    await this.userSchema.findByIdAndUpdate(id, {
      $set: {
        ...updateUserInput,
        userName,
        email,
        password,
      },
    });

    return 'UPDATE USER SUCCESS';
  }

  async deleteUserById(id: string): Promise<string> {
    const user = await this.userSchema.findById(id);
    if (!user) {
      throw new NotFoundException('USER NOT FOUND');
    }

    await this.userSchema.findOneAndRemove({ _id: id });

    return 'DELETE USER SUCCESS';
  }
}
