import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { BooksModule } from './module/books/books.module';
import { join } from 'path';
import { CategoriesModule } from './module/categories/categories.module';
import { LoaderModule } from './module/loader/loader.module';
import { RentModule } from './module/rent/rent.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './module/auth/guards/roles.guard';
import { AuthModule } from './module/auth/auth.module';
import { PubsubModule } from './module/pubsub/pubsub.module';
import { NotificationModule } from './module/notification/notification.module';
import { UsersService } from './module/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './module/auth/constants/jwt-constanst';
import { MigrationModule } from './commands/migrations/migrations.module';

const jwtService = new JwtService({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '1h' }
});

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://phuctran125:WdVjwtzAaH5d015S@cluster0.rzaddwg.mongodb.net/bookStore?retryWrites=true&w=majority`
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            const token = connectionParams.authorization.split(' ')[1];
            return { req: {
              headers: {
                authorization: 'Bearer '+ token
              }
            }}
          },
        }
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      },
    }),
    UsersModule, 
    BooksModule, 
    CategoriesModule,
    LoaderModule,
    RentModule,
    AuthModule,
    PubsubModule,
    NotificationModule,
    CommandModule,
    MigrationModule
  ],
  controllers: [AppController],
  providers: [  
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}
function verifyToken(authToken: any) {
  throw new Error('Function not implemented.');
}

