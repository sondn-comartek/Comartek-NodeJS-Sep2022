import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';
import { JWTAuthGuard } from './auth.guard';
import { RolesGuard } from './role.guard';
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
    }),
   
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, JWTAuthGuard, RolesGuard,  JwtService]
})
export class AuthModule {}
