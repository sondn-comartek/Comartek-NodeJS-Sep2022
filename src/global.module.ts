import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './modules/schema/book.schema';
import { UserSchema } from './modules/schema/user.schema';
import { MediaSchema } from './modules/schema/media.schema';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRED_IN
      }
    }),
  BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
  ConfigModule.forRoot({
    envFilePath: '.env',
  }),
  
]
})
export class GlobalModule{}