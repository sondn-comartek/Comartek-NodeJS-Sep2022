import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ShipmentsModule } from './shipments/shipments.module';

@Module({
  imports: [
    QuotesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-demo'),
    ShipmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
