import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { ShipmentModule } from './shipment/shipment.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true ,
    }) ,
    MongooseModule.forRootAsync({
      imports: [ConfigModule] ,
      useFactory : (ConfigService : ConfigService) => ({
        uri : ConfigService.get<string>('MONGODB_URL'),
        useNewUrlParser : true ,
      }),
      inject : [ConfigService]
    }),
    BullModule.forRoot({
      redis : {
        host : 'localhost',
        port : 6379 
      }
    }) ,
    ScheduleModule.forRoot() ,
    ShipmentModule , 
    AuthModule ,
    UserModule , 

  ] 
})
export class AppModule {}
