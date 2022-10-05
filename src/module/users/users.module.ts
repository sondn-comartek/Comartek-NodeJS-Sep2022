import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { BooksModule } from 'src/module/books/books.module';
import { LoaderModule } from '../loader/loader.module';
import { RentModule } from '../rent/rent.module';
import { ImagesModule } from '../images/images.module';
import { APP_GUARD } from '@nestjs/core';
import { UserQueryResolver } from './resolvers/queries.resolver';
import { UserMutationResolver } from './resolvers/mutations.resolver';
import { RolesGuard } from '../auth/guards/roles.guard';
import { jwtConstants } from '../auth/constants/jwt-constanst';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => BooksModule),
    forwardRef(() => LoaderModule),
    RentModule,
    ImagesModule
  ],
  providers: [
    UserQueryResolver,
    UserMutationResolver,
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserQueryResolver, UserMutationResolver, UsersService]
})
export class UsersModule {}
