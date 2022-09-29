import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { GenTokenTool } from './tools/gen-token.tool';
import {JwtModule } from '@nestjs/jwt'
import { JwtStrategy, RoleStrategy, StatusStrategy } from './strategy';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    UserModule , 
    JwtModule 
  ] ,
  providers: [
    AuthResolver, 
    AuthService ,
    UserRepository , 
    GenTokenTool ,
    JwtStrategy ,
    StatusStrategy ,
    RoleStrategy
  ] ,
})
export class AuthModule {}
