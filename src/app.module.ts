import { Module, Global } from '@nestjs/common';
import { AppController} from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { HelperModule } from './helper/helper.module';
import { BullModule } from '@nestjs/bull';
import { PublishConsumModule } from './publishconsum/publishconsum.module';
import { UserModule } from './user/user.module';

@Global()
@Module({
  providers: [AppService],
  imports: [
  BullModule.forRoot({
    redis: {
      
      host: 'localhost',
      port: 6379,
      
    },
  }),
 
  AuthModule,
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: true,
    include: [AuthModule, AdminModule, UserModule ]
  }),
  ConfigModule.forRoot({
    envFilePath: '.env',
  }),
  MongooseModule.forRoot(process.env.DB),
  AdminModule,
  HelperModule,
  PublishConsumModule,
  UserModule,
  ],
  controllers: [AppController],
  exports: []

})
export class AppModule {}
