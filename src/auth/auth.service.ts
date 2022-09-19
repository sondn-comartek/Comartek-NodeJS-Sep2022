

import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { isMatchPassword } from 'src/utils/hash-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log("dayayy")
    const user = await this.userService.findOne(email);
    if (user && isMatchPassword(pass, user.hashedPassword)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async login(email: string, password: string) {
  //     console.log(email, password)
  //   const user = await this.userService.findOne(email);
  //   if (user && isMatchPassword(password, user.hashedPassword)) {
  //       const payload = { email: email, sub: user._id };
  //       return {
  //           access_token: this.jwtService.sign(payload)
  //       }
  //   }
  //   return {
  //       error: "Email is not existed or password is incorrect"
  //   }
  // }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}