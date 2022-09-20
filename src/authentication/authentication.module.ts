import { Module } from '@nestjs/common';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';

@Module({
  providers: [AuthenticationResolver, AuthenticationService],
})
export class AuthenticationModule {}
