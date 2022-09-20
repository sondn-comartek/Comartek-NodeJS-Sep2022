import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt'
import { TokenHelper } from './helpers/token.helper';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RoleStrategy } from './strategy/role.strategy';

@Module({
  imports : [
    JwtModule.register({}) , 
    UserModule
  ] ,
  controllers: [AuthController],
  providers: [AuthService , TokenHelper , JwtStrategy , RoleStrategy ] ,
  exports : []
})

export class AuthModule {}
