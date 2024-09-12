import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MigrationModule } from './commands/migrations/migrations.module';
import { AuthModule } from './modules/auth/auth.module';
import { jwtConstants } from './modules/auth/constants';
import { BookModule } from './modules/book/book.module';
import { CategoryModule } from './modules/category/category.module';
import { DataloaderModule } from './modules/dataloader/dataloader.module';
import { DataLoaderService } from './modules/dataloader/dataloader.service';
import { FileUploadModule } from './modules/fileupload/fileupload.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
const jwt = require('jsonwebtoken')

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/api_library_management'),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,

      // sortSchema: true,
      imports: [DataloaderModule],
      inject: [DataLoaderService],
      useFactory: (dataloaderService: DataLoaderService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          installSubscriptionHandlers: true,
          context: () => ({
            loaders: dataloaderService.createLoaders(),
          }),
          subscriptions: {
            'subscriptions-transport-ws': {
              onConnect: async (connectionParams) => {
                const connectionParamsLowerKeys: Object = connectionParams.Authorization
                const authToken = connectionParams.Authorization;
                const token = authToken.split(' ')[1]
                // // extract user information from token
                const user = await jwt.verify(token, jwtConstants.secret)
                // // return user info to add them to the context later
                return {
                  user,
                  headers: { authorization: connectionParamsLowerKeys },
                  loaders: dataloaderService.createLoaders()
                };
              },

            },

          },

        };
      },

    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    BookModule,
    OrderModule,
    FileUploadModule,
    MigrationModule,
    CommandModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
