import { Module} from '@nestjs/common';
import { AppController} from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';


import { AdminModule } from './modules/admin/admin.module';
import { PublishConsumModule } from './modules/publishconsum/publishconsum.module';
import { UserModule } from './modules/user/user.module';
import { GlobalModule } from './global.module';
import { BookModule } from './modules/book/book.module';
import { PubSubModule } from './modules/pubSub/pubSub.module';
import { OrderModule } from './modules/order/order.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './modules/file/file.module';


@Module({
  providers: [AppService],
  imports: [

  GlobalModule.register({env: "dev"}),
  ConfigModule.forRoot({
    envFilePath: '.env',
  }),
  PublishConsumModule.register({env: "dev"}),
  PubSubModule,
 
  AuthModule,
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
   
    subscriptions: {
      'subscriptions-transport-ws': {
        path: "/graphql",
        onConnect: async (connectionParams) => {
          return {
            req: {
              header: (properties: string) => {
                return connectionParams[properties]
              }
            }
          }
        }
      }
    },
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: true,
    include: [AuthModule, AdminModule, UserModule, BookModule ]
  }),

  AdminModule,
  
  PublishConsumModule,
  UserModule,
  BookModule,
  OrderModule,
  FileModule,
  ],
  controllers: [AppController],
  exports: [AppService]
})
export class AppModule {}


