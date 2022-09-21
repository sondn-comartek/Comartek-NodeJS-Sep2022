import { Module } from '@nestjs/common';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';
import { PasswordModule } from '../password/password.module';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { JWTStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../shared/schemas/user.schema';

@Module({
  imports: [
    PasswordModule,
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AuthenticationResolver,
    AuthenticationService,
    JwtService,
    JWTStrategy,
  ],
})
export class AuthenticationModule {}
