import { Controller, Post, Body, Get, UseGuards, Req } from "@nestjs/common";
import { Request } from "express";
import { Role } from "src/common/enums";
import { AuthService } from "./auth.service";
import { Roles } from "./decorators/role.decorator";
import { CreateLoginRequestDto } from "./dto/create-login-request.dto";
import { CreateRegisterRequestDto } from "./dto/create-register-request.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RolesGuard } from "./guards/role.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() createLoginRequestDto: CreateLoginRequestDto) {
    return await this.authService.login(createLoginRequestDto);
  }

  @Post("register")
  async register(@Body() createRegisterRequestDto: CreateRegisterRequestDto) {
    return await this.authService.register(createRegisterRequestDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get("protected")
  async example(@Req() request: Request) {
    return { message: "Example protected router", user: request.user };
  }
}
