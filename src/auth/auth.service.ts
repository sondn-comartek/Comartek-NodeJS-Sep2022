import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthInput } from './dto/create-auth.input';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

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
    return {
      access_token: this.jwtService.sign({
        username,
        password,
      }),
    };
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
