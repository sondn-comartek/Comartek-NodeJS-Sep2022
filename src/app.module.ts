import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { BooksModule } from './modules/books/books.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BullModule } from '@nestjs/bull';
import { BookItemsModule } from './modules/book-items/book-items.module';
import { LoansModule } from './modules/loans/loans.module';
import { DataloaderModule } from './modules/dataloader/dataloader.module';
import { DataloaderService } from './modules/dataloader/dataloader.service';
import { UploadModule } from './modules/upload/upload.module';
import { CommandModule } from 'nestjs-command';
import { MigrationModule } from './commands/migrations/migrations.module';
import { PubsubModule } from './modules/pubsub/pubsub.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-library'),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      // sortSchema: true,
      imports: [DataloaderModule],
      inject: [DataloaderService],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          subscriptions: {
            'subscriptions-transport-ws': {
              path: '/graphql',
            },
            onConnect: async (connectionParams) => {
              const authToken = connectionParams?.authorization;
              // console.log('connectionParams', connectionParams);
              return {
                req: {
                  headers: {
                    authorization: authToken,
                  },
                },
              };
            },
          },
          context: () => ({
            loaders: dataloaderService.createLoaders(),
          }),
        };
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    CategoriesModule,
    BookItemsModule,
    LoansModule,
    DataloaderModule,
    UploadModule,
    PubsubModule,
    CommandModule,
    MigrationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
