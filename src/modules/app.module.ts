import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { ShipmentModule } from './shipment/shipment.module';

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
    ShipmentModule,
  ]
})
export class AppModule {}
