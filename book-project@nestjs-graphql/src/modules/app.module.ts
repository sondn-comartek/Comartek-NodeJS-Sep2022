import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module'
import { CategoryModule } from './category/category.module'
import { BookModule } from './book/book.module'
import { OrderModule } from './order/order.module'
import { ImageModule } from './image/image.module'
import { BullModule } from '@nestjs/bull'
import { DataloaderModule } from './dataloader/dataloader.module'
import { subscriptionConfig, redisConfig, mongoConfig } from 'src/configs'
import { PubSub } from 'graphql-subscriptions'
import { MigrationModule } from 'bin/commands/migrations/migration.module'
import { CommandModule } from 'nestjs-command'
import { ExcelModule } from './excel/excel.module';

@Module({
   imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
         driver: ApolloDriver,
         autoSchemaFile: true,
         installSubscriptionHandlers: true,
         subscriptions: subscriptionConfig(),
      }),
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      MongooseModule.forRootAsync({
         imports: [ConfigModule],
         useFactory: (configService: ConfigService) =>
            mongoConfig(configService),
         inject: [ConfigService],
      }),
      BullModule.forRootAsync({
         imports: [ConfigModule],
         useFactory: (configService: ConfigService) =>
            redisConfig(configService),
         inject: [ConfigService],
      }),
      AuthModule,
      UserModule,
      CategoryModule,
      BookModule,
      OrderModule,
      ImageModule,
      DataloaderModule,
      CommandModule ,
      MigrationModule,
      ExcelModule
   ],
})
export class AppModule {}
