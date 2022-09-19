import { Module} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RateSchema } from '../schemas/rate.schema';
import { QuoteSchema} from '../schemas/quote.schema'
import { ShipmentSchema } from '../schemas/shipment.schema';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { DisCountSchema } from 'src/schemas/discount.schema';
import { BullModule } from '@nestjs/bull';
import { ShipmentConsumer } from './shipment.consumer';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
    {name: "rate", schema: RateSchema},
    {name: "quote", schema: QuoteSchema},
    {name: "shipment", schema: ShipmentSchema},
    {name: "discount", schema: DisCountSchema}
  ]),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '3 days'}
  }),
  BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
  BullModule.registerQueue({
    name: 'createshipment',
  })
  ],
  controllers: [ClientController],
  providers: [ClientService, ShipmentConsumer ]
})
export class ClientModule {}

