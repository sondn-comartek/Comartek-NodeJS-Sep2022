import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
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

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.rzaddwg.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
      },
    }),
    UsersModule, 
    BooksModule, 
    CategoriesModule,
    LoaderModule,
    RentModule,
    AuthModule
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
