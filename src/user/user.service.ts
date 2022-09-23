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

  async getUserByUserName(userName: string): Promise<User> {
    return await this.userSchema.findOne({ userName: userName.toLowerCase() });
  }

  async updateUserById(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    let userName = updateUserInput?.userName;
    let email = updateUserInput?.email;
    let password = updateUserInput?.password;

    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('User không tồn tại');
    }

    // if (userName) {
    //   switch (userName === user.userName) {
    //     case true:
    //       break;

    //     case false:
    //       const existedUserName = await this.getUserByUserName(userName);
    //       if (existedUserName) {
    //         throw new ConflictException("Tên người dùng đã được sử dụng")
    //       }
    //       break

    //     default:
    //       break;
    //   }
    //   userName = userName.toLowerCase();
    // }

    if (userName) {
      if (userName === user.userName) {
      } else {
        const existedUserName = await this.getUserByUserName(userName);
        if (existedUserName) {
          throw new ConflictException('Tên người dùng đã được sử dụng');
        }
      }

      userName = userName.toLowerCase();
    }

    if (email) {
      const registeredEmail = await this.getUserByEmail(email);
      if (registeredEmail) {
        throw new ConflictException('Email đã được sử dụng');
      }
      email = email.toLowerCase();
    }

    if (password) {
      password = await this.passwordService.encryptPassword(password);
    }

    return await this.userSchema.findOneAndUpdate(
      { id },
      {
        $set: {
          ...updateUserInput,
          userName,
          email,
          password,
        },
      },
      {
        new: true,
      },
    );
  }

  async deleteUserById(id: string): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('User không tồn tại');
    }

    return await this.userSchema.findOneAndRemove({ id }, { new: true });
  }

  // async getUserByDefaultId(id: string) {
  //   return await this.userSchema.findById(id)
  // }
}
