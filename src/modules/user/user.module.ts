import { RentModule } from './../rent/rent.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRentLoader } from '../loader/loader.rent';
import { UserQueryResolver } from './resolvers/user-query.resolver';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    RentModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserQueryResolver, UserRentLoader],
  exports: [UserService],
})
export class UserModule {}
