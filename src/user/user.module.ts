import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { JWTAuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt'
@Module({
  imports: [AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRED_IN
      }
    })],
  providers: [UserResolver, UserService, JWTAuthGuard]
})
export class UserModule {}
