import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApolloError } from 'apollo-server-errors';
import { hashPassword, isMatchPassword } from 'src/utils/hash-password';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Role } from './roles/role.enum';
import { UserStatus } from './entities/userStatus.enum';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly user: Model<User>,
    // private readonly authService: AuthService

  ){}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const existedUser = await this.user.findOne({ email: createUserInput.email });
    if (existedUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(createUserInput.password);
    createUserInput.password = hashedPassword;
    delete createUserInput.confirmPassword;

    // Generate userId
    const characters = '0123456789';
    let userId = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      userId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const newUser = {
      userId: userId,
      ...createUserInput,
      status: UserStatus.ACTIVE
    }
    
    const createdUser = await this.user.create(newUser);
    if (createdUser) {
      // const token = this.authService.login(createdUser.email, createdUser.hashedPassword);
      return createdUser;
    }
    throw new ApolloError('Cannot create an user')
  }

  async login(loginUserInput: LoginUserInput): Promise<User> {
    const user = await this.user.findOne({ email: loginUserInput.email });
    if (!user) {
      throw new Error(`User with email ${loginUserInput.email} not found`);
    }

    const isCorrectPassword = isMatchPassword(loginUserInput.password, user.password);
    if (isCorrectPassword) {
      return user;
    } else {
      throw new Error('Incorrect password');
    }
  }

  async findAll() {
    const userList = await this.user.find();
    return userList
    // return {
    //   message: 'This action returns all users',
    //   data: userList
    // }
    // return `This action returns all users`;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.user.findOne({ email: email })
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return user;
  }

  async validateLogin(loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;
    const user = await this.findOne(email);
    const checkPassword = isMatchPassword(password, user.password);
    if (checkPassword) {
      return user;
    }
    throw new Error('Password is incorrect');
  }

  async findById(userId: string): Promise<User> {
    const user = await this.user.findOne({ userId: userId });
    if (!user) {
      throw new Error(`User with userId ${userId} not found`);
    }
    return user;
  }
}
