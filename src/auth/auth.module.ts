import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt'
@Module({
  imports: [
    MongooseModule.forFeature(
    [{
      name: 'user', schema: UserSchema
    }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRED_IN
      }
    })
  ],
  providers: [AuthResolver, AuthService]
})
export class AuthModule {}
