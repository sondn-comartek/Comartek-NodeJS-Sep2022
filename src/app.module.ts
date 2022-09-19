import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentModule } from './shipment/shipment.module';
import { QuoteModule } from './quote/quote.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { CronModule } from './cron/cron.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ShipmentModule,
    QuoteModule,
    MongooseModule.forRoot(
      'mongodb+srv://phuctran125:WdVjwtzAaH5d015S@cluster0.rzaddwg.mongodb.net/shipment?retryWrites=true&w=majority'
    ),
    UserModule,
    ScheduleModule.forRoot(),
    CronModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CronService],
})
export class AppModule {}
