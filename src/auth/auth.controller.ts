import { Controller, Body, Post } from '@nestjs/common';
import { IsNotEmpty,IsString} from 'class-validator';
import { AuthService } from './auth.service';
export class UserLoginDataDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string
}
export class RegisterDataDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string
}
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService) {}

  @Post('/login')
  async Login(@Body() user: UserLoginDataDto ) {
    const token = await this.authService.login(user.username, user.password)
    return {message: token}
  }

  @Post('/register')
  async Register(@Body() registerData: RegisterDataDto ) {
    if(await this.authService.register(registerData.username, registerData.password)) {
      return {message: "create account scuccess"}
    }
    return  {message: "create account fail"}
  }
}
