import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { GenTokenTool } from './tools/gen-token.tool';
import {JwtModule, JwtService } from '@nestjs/jwt'
import { JwtStrategy, RoleStrategy, StatusStrategy } from './strategy';
import { UserRepository } from '../user/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './models';
import { TokenRepository } from './jwt.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name : Token.name ,
      schema : TokenSchema
    }]) ,
    JwtModule , 
    forwardRef( () => UserModule)
  ] ,
  providers: [
    AuthResolver, 
    UserRepository , 
    GenTokenTool ,
    JwtStrategy ,
    StatusStrategy ,
    RoleStrategy ,
    TokenRepository  ,
    AuthService ,
    JwtService
  ] ,
  exports : [
    GenTokenTool ,
    JwtStrategy ,
    StatusStrategy ,
    RoleStrategy ,
    TokenRepository  ,
    AuthService ,
    JwtService
  ]
})
export class AuthModule {}
