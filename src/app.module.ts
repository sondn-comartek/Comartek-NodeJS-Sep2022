import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { PasswordModule } from './password/password.module';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Environments } from './environments';
import { JwtModule } from '@nestjs/jwt';
import { PetModule } from './pet/pet.module';
import { OrderModule } from './order/order.module';
import { PhotoModule } from './photo/photo.module';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EmailModule } from './email/email.module';
import * as redisStore from 'cache-manager-redis-store';
import { MailerModule } from '@nestjs-modules/mailer';
import { CachingModule } from './caching/caching.module';
import { TagModule } from './tag/tag.module';
import { BullModule } from '@nestjs/bull';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { TaskSchedulingModule } from './task-scheduling/task-scheduling.module';

@Module({
  imports: [
    MulterModule.register(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRoot({
      transports: {
        // service: "gmail",
        auth: {
          user: 'nodemailer.demo.v1@gmail.com',
          pass: Environments.EmailPass,
        },
      },
      defaults: {
        from: 'nodemailer.demo.v1@gmail.com',
      },
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    JwtModule.register({
      secret: Environments.JwtSecret,
    }),
    MongooseModule.forRoot(Environments.MongoUrl),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      plugins: [],
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      include: [
        AuthenticationModule,
        CategoryModule,
        EmailModule,
        UserModule,
        PetModule,
        OrderModule,
        TagModule,
      ],
    }),
    AuthenticationModule,
    UserModule,
    PasswordModule,
    PetModule,
    OrderModule,
    PhotoModule,
    CategoryModule,
    CloudinaryModule,
    EmailModule,
    CachingModule,
    TagModule,
    UploadModule,
    TaskSchedulingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
