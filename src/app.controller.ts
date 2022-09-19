import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { Request } from 'express';



@Controller('cat')
export class AppController {
  constructor(private readonly appService: AppService,) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@Req() req: Request ): string {
    console.log(req.user)
    return this.appService.getHello();
  }

}
