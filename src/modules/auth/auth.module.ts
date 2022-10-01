import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordHelper } from './helpers/password.helper';
import { JwtModule } from '@nestjs/jwt';
import { AuthMutationResolver } from './resolvers/auth-mutation.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'Your secret string',
    }),
  ],
  providers: [AuthService, PasswordHelper, AuthMutationResolver, JwtStrategy],
})
export class AuthModule {}
