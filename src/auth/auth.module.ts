import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants?.secret || 'secret',
      signOptions: { expiresIn: process.env.EXPIRE_TOKEN || '3d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
