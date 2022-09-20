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
      useFactory : (ConfigService: ConfigService) => ({
        uri : ConfigService.get<string>('MONGODB_URL'),
        useNewUrlParser : true ,
      }),
      inject : [ConfigService]
    }),
    BullModule.forRootAsync({
      imports : [ConfigModule] ,
      useFactory: (ConfigService: ConfigService) => ({
       redis : {
        host : ConfigService.get('REDIS_HOST') ,
        port : ConfigService.get('REDIS_PORT')
       }
      }),
      inject : [ConfigService]
    }) ,
    ScheduleModule.forRoot() ,
    ShipmentModule , 
    AuthModule ,
    UserModule , 

  ] 
})
export class AppModule {}
