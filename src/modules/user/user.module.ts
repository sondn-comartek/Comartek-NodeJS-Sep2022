import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { OrderLoader } from '../loader/order.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => OrderModule),
  ],
  providers: [
    UserResolver,
    UserService,
    OrderLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
