import { NotificationModule } from './modules/notification/notification.module';
import { BadRequestException, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { BullModule } from '@nestjs/bull';
import { BookModule } from './modules/book/book.module';
import { MediaModule } from './modules/media/media.module';
import { OrderModule } from './modules/order/order.module';
import { StatisticalModule } from './modules/statistical/statistical.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // installSubscriptionHandlers: true,
      include: [
        UserModule,
        AuthModule,
        CategoryModule,
        BookModule,
        MediaModule,
        OrderModule,
        StatisticalModule,
        NotificationModule,
      ],
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schemas/schema.gql'),
      sortSchema: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
          onConnect: (connectionParams) => {
            const token = connectionParams.authorization;
            return {
              req: {
                headers: {
                  authorization: token,
                },
              },
            };
          },
        },
      },
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    BookModule,
    MediaModule,
    OrderModule,
    StatisticalModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
