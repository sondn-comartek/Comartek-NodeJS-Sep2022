import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ShipmentModule } from "./shipment/shipment.module";
import { QuoteModule } from "./quote/quote.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PasswordModule } from "./password/password.module";
import { UserModule } from "./user/user.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskSchedulingModule } from './task-scheduling/task-scheduling.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ScheduleModule.forRoot(),
    QuoteModule,
    ShipmentModule,
    AuthModule,
    PasswordModule,
    UserModule,
    TaskSchedulingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
