import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import {JwtService} from '@nestjs/jwt'
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    UserModule,
  ],
  providers: [AuthResolver, AuthService, JwtService],
})
export class AuthModule {}
