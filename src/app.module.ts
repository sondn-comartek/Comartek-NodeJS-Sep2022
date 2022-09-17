import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ShipmentModule } from "./shipment/shipment.module";
import { QuoteModule } from "./quote/quote.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './password/password.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    QuoteModule,
    ShipmentModule,
    AuthModule,
    PasswordModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
