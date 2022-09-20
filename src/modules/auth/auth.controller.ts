import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService,
    private readonly UserService: UserService
  ) {}

  @Post('/register')
  Register(@Body() RegisterDto: RegisterDto) {
    return this.AuthService.SignUp(RegisterDto) ;
  }

  @Post('/login')
  Login(@Body() LoginDto: RegisterDto) {
    return this.AuthService.SignIn(LoginDto);
  }
}
