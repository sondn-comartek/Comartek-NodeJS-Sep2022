import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ShipmentsModule } from './shipments/shipments.module';
import { UsersModule } from './users/users.module';
import { RolesGuard } from './users/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    QuotesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-demo'),
    ShipmentsModule,
    UsersModule,
    AuthModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
