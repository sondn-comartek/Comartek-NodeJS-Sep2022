import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { PasswordModule } from '../password/password.module';
import { UserModule } from '../user/user.module';
import { User, UserEntity } from '../common/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME
      }
    }),
    PasswordModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
