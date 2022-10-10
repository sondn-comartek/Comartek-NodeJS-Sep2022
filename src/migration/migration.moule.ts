import { Module, Global } from '@nestjs/common';
import { GlobalModule } from '../global.module';
import { AdminModule } from '../modules/admin/admin.module';
import { MigrationService } from './migration.service';
import {BookModule} from '../modules/book/book.module';
import { AuthModule } from '../modules/auth/auth.module';
import { OrderModule } from '../modules/order/order.module';
import { PubSubModule } from '../modules/pubSub/pubSub.module';
import { UserModule } from '../modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MigrationSchema } from './model/migration.schema';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import config from './config';
import { PublishConsumModule } from '../modules/publishconsum/publishconsum.module';
import { HelperModule } from '../modules/helper/helper.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      ignoreEnvFile: true,
      // envFilePath: "./src/migration/.env",
      
      
    }),
    HelperModule,  
    PublishConsumModule.register({env: "migration"}),
    GlobalModule.register({env: process.env.TYPE}),
    AdminModule,
    BookModule,
    AuthModule,
    OrderModule,
    PubSubModule,
    UserModule,
    MongooseModule.forFeature(
      [
        {
          name: 'migration', schema: MigrationSchema
        }
        
    ]),
  ],
  providers: [MigrationService]
}
)
export class MigrationModule { }
