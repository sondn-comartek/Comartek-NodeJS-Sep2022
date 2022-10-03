import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthInput } from './dto/create-auth.input';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/entities/user.entity';
import { CreateUserInput } from './dto/register-auth.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
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

  async register(createUserInput: CreateUserInput) {
    try {
      const { username } = createUserInput;
      const userExist = await this.userModel.findOne({ username });
      if (userExist) {
        return new Error(`User ${username} already exists`);
      }
      const { password } = createUserInput;
      const hashedPassword = await this.hashPassword(password);
      return await new this.userModel({
        ...createUserInput,
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

  async validateUser(username: string, password: string): Promise<any> {
    const userExist = await this.userModel.findOne({ username });
    if (!userExist) {
      return null;
    }

    const checkedPassword = await this.checkPassword(
      password,
      userExist.password,
    );

    if (checkedPassword) {
      const { password, ...result } = userExist;
      return result;
    }
    return null;
  }

  async login(createAuthInput: CreateAuthInput) {
    const { username, password } = createAuthInput;
    const user = await this.userModel.findOne({ username });
    const access_token = await this.jwtService.sign({
      username,
      password,
    });

    return { access_token, user };
  }

  async verifyToken(token: string) {
    try {
      const decode = await this.jwtService.verify(token);
      return decode;
    } catch (e) {
      throw e;
    }
  }
}
