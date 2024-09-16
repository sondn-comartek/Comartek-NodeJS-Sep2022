import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/schema/user.schema';
@Module({
  imports: [AuthModule,
    MongooseModule.forFeature(
      [{
        name: 'user', schema: UserSchema
      }]),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.EXPIRED_IN
        }
      }),],
  providers: [UserResolver, UserService]
})
export class UserModule {}
