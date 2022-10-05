import { BookRentalCountLoader } from './../loader/loader.rent';
import { RentModule } from './../rent/rent.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRentLoader } from '../loader/loader.rent';
import { UserQueryResolver } from './resolvers/user-query.resolver';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { Rent, RentSchema } from '../rent/schemas/rent.schema';
import { UserMutationResolver } from './resolvers/user-mutation.resolver';

@Module({
  imports: [
    RentModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Rent.name,
        schema: RentSchema,
      },
    ]),
  ],
  providers: [
    UserService,
    UserQueryResolver,
    UserMutationResolver,
    UserRentLoader,
    BookRentalCountLoader,
  ],
  exports: [UserService],
})
export class UserModule {}
