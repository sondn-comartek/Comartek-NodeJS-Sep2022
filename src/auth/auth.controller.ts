import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginRequestDto } from './dto/create-login-request.dto';
import { CreateRegisterRequestDto } from './dto/create-register-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  async login(@Body() createLoginRequestDto: CreateLoginRequestDto) {
    return await this.authService.login(createLoginRequestDto);
  }

  @Post("register")
  async register(@Body() createRegisterRequestDto: CreateRegisterRequestDto) {
    return await this.authService.register(createRegisterRequestDto);
  }
}
