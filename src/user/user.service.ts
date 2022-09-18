import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const password = await this.hashPassword(createUserDto?.password);
    const dataReady = {
      ...createUserDto,
      password,
    };
    try {
      const urModel = new this.userModel(dataReady);
      const createdUser = await urModel.save();
      return {
        data: {
          message: 'create user success',
          user: createdUser,
        },
      };
    } catch (error) {
      throw Error(error);
    }
  }
  // hash password before insert into db
  async hashPassword(password: any): Promise<string> {
    const salt = await genSalt(10);
    const hashPass = await hash(password, salt);
    return hashPass;
  }
  findAll() {
    return `This action returns all user`;
  }
  async login(account) {
    const { username, password } = account;
    try {
      const logger = await this.userModel.findOne({ username: username });
      const isCompare = await this.comparePassword(logger?.password, password);
      if (isCompare) {
        const loginToken = await this.signToken(
          {
            id: logger?._id,
            username: logger?.username,
            role: logger?.role,
          },
          'login',
        );
        return {
          data: {
            message: {
              status: 'login success',
              token: loginToken,
            },
          },
        };
      }
    } catch (error) {
      throw Error(error);
    }
  }
  async comparePassword(passwordLogger, candidatePassword): Promise<boolean> {
    const isMatch = await compare(candidatePassword, passwordLogger);
    return isMatch;
  }
  async signToken(info, typeToken: string): Promise<string> {
    const token = await jwt.sign(
      { ...info, type: typeToken },
      process.env.KEY,
      {
        expiresIn: process.env.EXPIRE_TOKEN,
      },
    );
    return token;
  }
  async findOne(username: string, password: string) {
    const user = await this.userModel.findOne({ username: username });
    const isCompare = await this.comparePassword(user?.password, password);
    if (isCompare) {
      return user;
    }
    return null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
