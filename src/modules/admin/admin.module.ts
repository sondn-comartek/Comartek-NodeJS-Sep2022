import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../schema/book.schema';
import { PublishConsumModule } from 'src/modules/publishconsum/publishconsum.module';
import { UserSchema } from 'src/modules/schema/user.schema';
import { UserLoader } from './admin.dataloader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {DataLoaderInterceptor} from 'nestjs-dataloader'
import { GlobalModule } from 'src/global.module';
@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'book', schema: BookSchema
        },
        {
          name: 'user', schema: UserSchema
        }
    ]),
    GlobalModule, 
    PublishConsumModule
  ],
  providers: [AdminResolver, AdminService, 
    UserLoader,
    {
    provide: APP_INTERCEPTOR,
    useClass: DataLoaderInterceptor,
  }]
})
export class AdminModule { }
