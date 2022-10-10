import { BadRequestException, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { CategoryModule } from './modules/category/category.module';
import { RentModule } from './modules/rent/rent.module';
import { UploadModule } from './modules/upload/upload.module';
import { LoaderModule } from './modules/loader/loader.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { MediaModule } from './modules/media/media.module';
import { NotificationModule } from './modules/notification/notification.module';
import { PubSubModule } from './modules/pubsub/pubsub.module';
import { CronModule } from './modules/cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExtractDataModule } from './modules/extract-data/extract-data.module';
import { CommandModule } from 'nestjs-command';
import { MigrationsModule } from './commands/migrations/migrations.module';
import { ExcelModule } from './modules/excel/excel.module';
import { SocketModule } from './modules/socket/socket.module';

const jwtService = new JwtService({
  secret: 'Your secret string',
});

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
          onConnect: async (connectionParams) => {
            const authHeader: string =
              connectionParams?.authorization ||
              connectionParams?.Authorization;
            if (!authHeader) {
              throw new BadRequestException('Token is not provided');
            }

            const authToken: string = authHeader.split(' ')[1];
            if (!authToken) {
              throw new BadRequestException('Token is not provided');
            }

            const jwtPayload: any = await jwtService.verifyAsync(authToken);
            if (jwtPayload) {
              if (jwtPayload?._id && jwtPayload?.role) {
                return {
                  user: jwtPayload,
                };
              }
            }

            throw new BadRequestException('You are not authenticated');
          },
        },
      },
      include: [
        AppModule,
        AuthModule,
        UserModule,
        RentModule,
        BookModule,
        UploadModule,
        MediaModule,
        NotificationModule,
        ExtractDataModule,
        ExcelModule,
      ],
    }),
    JwtModule.register({
      secret: 'Your secret string',
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ScheduleModule.forRoot(),
    MigrationsModule,
    CommandModule,
    AuthModule,
    UserModule,
    RentModule,
    BookModule,
    CategoryModule,
    UploadModule,
    LoaderModule,
    MediaModule,
    NotificationModule,
    PubSubModule,
    CronModule,
    ExtractDataModule,
    ExcelModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
