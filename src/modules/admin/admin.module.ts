import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../schema/book.schema';
import { PublishConsumModule } from '../publishconsum/publishconsum.module';
import { UserSchema } from '../schema/user.schema';
import { UserLoader } from './admin.dataloader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {DataLoaderInterceptor} from 'nestjs-dataloader'
import { GlobalModule } from '../../global.module';
import { JwtService } from '@nestjs/jwt';
import { ImagePublish } from '../publishconsum/image.publish';
@Module({
  imports: [
    // PublishConsumModule.register({env: "dev"}),
    MongooseModule.forFeature(
      [
        {
          name: 'book', schema: BookSchema
        },
        {
          name: 'user', schema: UserSchema
        }
    ]),
  ],
  providers: [AdminResolver, AdminService, JwtService,
    UserLoader,
    {
    provide: APP_INTERCEPTOR,
    useClass: DataLoaderInterceptor,
  }]
})
export class AdminModule { }
