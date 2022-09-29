import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql' ;
import { ApolloDriver , ApolloDriverConfig } from '@nestjs/apollo'
import { AuthModule } from './auth/auth.module';
import { ConfigModule , ConfigService } from '@nestjs/config' ;
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { OrderModule } from './order/order.module';
import { ImageModule } from './image/image.module';
import { BullModule } from '@nestjs/bull';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver : ApolloDriver ,
      autoSchemaFile : true  , 
    }),
    ConfigModule.forRoot({
      isGlobal : true 
    }) ,
    MongooseModule.forRootAsync({
      imports : [ConfigModule] ,
      useFactory : ( configService: ConfigService) => ({
        uri : configService.get<string>('MONGODB_URL'),
        useNewUrlParser : true ,
      }) , 
      inject : [ConfigService] ,
    }) ,
    BullModule.forRootAsync({
      imports : [ConfigModule] ,
      useFactory : (configService:ConfigService) => ({
        redis : {
          host : configService.get<string>('REDIS_HOST'),
          port : configService.get<number>('REDIS_PORT'),
        }
      }),
      inject : [ConfigService ]
    }) ,
    AuthModule,
    UserModule,
    CategoryModule,
    BookModule,
    OrderModule,
    ImageModule ,

  ],
})
export class AppModule {}
