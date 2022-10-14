import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthQueryResolver } from './resolvers/queries.resolver';
import { AuthMutationResolver } from './resolvers/mutations.resolver';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { jwtConstants } from './constants/jwt-constanst';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => PassportModule),
    forwardRef(() => UsersModule)
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthQueryResolver,
    AuthMutationResolver, 
    AuthService, 
    JwtStrategy
  ],
  exports: [AuthService],
})
export class AuthModule {}