import { LoginAccountDto } from './../quote/dto/login-account.dto';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(userInfo) {
    const { username, password } = userInfo;
    try {
      const user = await this.userService.findOne(username, password);
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw Error(error);
    }
  }
  async login(userInfo: LoginAccountDto) {
    
    try {
      const user = await this.validateUser({ ...userInfo });
      // return user
      const payload = {
        userID: user._id,
        username: user.username,
        role: user.role,
      };
      return {
        message: {
          status: 'login success',
          token: this.jwtService.sign(payload),
        },
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
