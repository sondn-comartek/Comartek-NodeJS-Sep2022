import { Module } from '@nestjs/common';
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
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { MediaModule } from './modules/media/media.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { NotificationModule } from './modules/notification/notification.module';
import { MigrationModule } from './modules/migration/migration.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RentModule,
    BookModule,
    CategoryModule,
    UploadModule,
    LoaderModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [
        AppModule,
        AuthModule,
        UserModule,
        RentModule,
        BookModule,
        UploadModule,
        MediaModule,
        NotificationModule,
      ],
    }),
    JwtModule.register({
      secret: 'Your secret string',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017'),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MediaModule,
    ScheduleModule,
    NotificationModule,
    MigrationModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
