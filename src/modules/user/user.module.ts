import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserQueryResolver } from './resolvers/user-query.resolver';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserQueryResolver],
  exports: [UserService],
})
export class UserModule {}
