import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findOne(email);
      const isMatch = await this.userService.comparePassword(
        password,
        user?.password,
      );
      if (!isMatch) {
        throw new Error('password is not compare');
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async login(user: any): Promise<string> {
    const payload = {
      userID: user?._id,
      email: user?.email,
      role: user?.role,
    };
    return this.jwtService.sign(payload);
  }
}
