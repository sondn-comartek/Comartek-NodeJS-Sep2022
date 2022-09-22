import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
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

@Module({
  imports: [
    MailerModule.forRoot({
      transports: {
        auth: {
          user: 'nodemailer.demo.v1@gmail.com',
          pass: '',
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
    AuthorizationModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
