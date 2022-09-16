import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateLoginRequestDto } from './dto/create-login-request.dto';
import { CreateRegisterRequestDto } from './dto/create-register-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  async login(@Body() createLoginRequestDto: CreateLoginRequestDto, @Res() response: Response) {
    let statusCode;
    const data = await this.authService.login(createLoginRequestDto);

    if (data.hasOwnProperty("error")) {
      statusCode = HttpStatus.BAD_REQUEST;
    } else {
      statusCode = HttpStatus.OK;
    }

    return response.status(statusCode).json({ data });
  }

  @Post("register")
  async register(@Body() createRegisterRequestDto: CreateRegisterRequestDto, @Res() response: Response) {
    let statusCode;
    const data = await this.authService.register(createRegisterRequestDto);

    if (data.hasOwnProperty("error")) {
      statusCode = HttpStatus.BAD_REQUEST;
    } else {
      statusCode = HttpStatus.OK;
    }

    return response.status(statusCode).json({ data });
  }
}
