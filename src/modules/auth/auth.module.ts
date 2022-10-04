import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import {JwtService} from '@nestjs/jwt'
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './role.guard';
@Module({
  imports: [
    UserModule,
  ],
  providers: [AuthResolver, AuthService, JwtService, JwtStrategy, RolesGuard],
})
export class AuthModule {}
