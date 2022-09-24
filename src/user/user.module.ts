import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../shared/schemas/user.schema';
import { UserResolver } from './user.resolver';
import { PasswordModule } from 'src/password/password.module';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PasswordModule,
    AuthenticationModule,
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
