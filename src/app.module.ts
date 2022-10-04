import { Module} from '@nestjs/common';
import { AppController} from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { HelperModule } from './modules/helper/helper.module';
import { PublishConsumModule } from './modules/publishconsum/publishconsum.module';
import { UserModule } from './modules/user/user.module';
import { GlobalModule } from './global.module';
import { BookModule } from './modules/book/book.module';
import { PubSubModule } from './modules/pubSub/pubSub.module';
import { OrderModule } from './modules/order/order.module';


@Module({
  providers: [AppService],
  imports: [
  PubSubModule,
  GlobalModule,
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
  MongooseModule.forRoot(process.env.DB),
  AdminModule,
  HelperModule,
  PublishConsumModule,
  UserModule,
  BookModule,
  OrderModule,
  ],
  controllers: [AppController],
  exports: []
})
export class AppModule {}


