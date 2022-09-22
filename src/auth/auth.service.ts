import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async userLogin(logger): Promise<string> {
    const { email, password } = logger;
    try {
      const existAccount = await this.userService.findByEmail(email);
      const isCompare = await this.comparePassword(
        password,
        existAccount?.password,
      );
      if (isCompare) {
        const payload = {
          username: existAccount?.username,
          password: existAccount?.password,
          secret: process.env.SECRET || 'secret',
        };
        const token = await this.signToken(payload);
        return token;
      }
      throw new Error('password not compare');
    } catch (error) {
      throw new Error(error);
    }
  }
  async comparePassword(candidatePassword, password): Promise<boolean> {
    let isMatch = false;
    isMatch = await bcrypt.compare(candidatePassword, password);
    return isMatch;
  }
  async signToken(payload): Promise<string> {
    const token = await jwt.sign(payload, process.env.SECRET || 'secret', {
      expiresIn: process.env.EXPIRES_TOKEN_LOGIN,
    });
    return token;
  }
}
