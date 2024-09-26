import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

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

  async checkEmailExist(email: string) {
    try {
      const user = await this.userModel.findOne({
        email,
      });

      return user;
    } catch (e) {
      throw e;
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;
      const isEmailExist = await this.checkEmailExist(email);
      if (isEmailExist) {
        return {
          errCode: 1,
          errMessage: 'Your email address is already',
        };
      }

      const { password } = createUserDto;
      const hashedPassword = await this.hashPassword(password);
      return await new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      }).save();
    } catch (e) {
      throw e;
    }
  }

  async checkPassword(password: string, userPassword: string) {
    try {
      return await bcrypt.compareSync(password, userPassword);
    } catch (error) {
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const isEmailExist = await this.checkEmailExist(email);
      if (!isEmailExist) {
        return null;
      }

      const user = await this.userModel.findOne({ email });

      const checkedPassword = await this.checkPassword(password, user.password);
      return checkedPassword ? user : null;
    } catch (e) {
      return e;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
