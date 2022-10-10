import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword, isMatchPassword } from 'src/utils/hash-password';
import { Role } from '../auth/enums/role.enum';
import * as dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly user: Model<User>
  ) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const email = createUserInput.email;
    const existedUser = await this.user.findOne({ email: email });
    if (existedUser) {
      throw new Error(`User with email ${email} is existed. Can not use this email`);
    }

    // Hash password
    const hashedPassword = await hashPassword(createUserInput.password);
    createUserInput.password = hashedPassword;
    delete createUserInput.confirmPassword;

    const newUser = {
      userRole: Role.USER,
      ...createUserInput,
      createdAt: dayjs().unix(),
      updatedAt: dayjs().unix()
    };

    const createdUser = await this.user.create(newUser);
    if (!createdUser) {
      throw new Error('Can not create user');
    }
    return createdUser;
  }

  async findAllUser(): Promise<User[]> {
    const userList = await this.user.find({
      'userRole': { $ne: 'Admin' }
    });
    if (!userList) {
      throw new HttpException("Error in get all user", HttpStatus.BAD_REQUEST);
    }
    return userList;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.user.findOne({ email: email });
    if (!user) {
      throw new HttpException(`User with email ${email} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByIds(idList: string[]): Promise<User[]> {
    const userList = await this.user.find({
      _id: { $in: idList }
    });
    if (!userList) {
      throw new Error('Can not get list of user');
    }
    return userList;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
