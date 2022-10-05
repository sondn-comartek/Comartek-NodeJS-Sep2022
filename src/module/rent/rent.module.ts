import { forwardRef, Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentBookSchema } from './entities/rent.entity';
import { BooksModule } from 'src/module/books/books.module';
import { RentQueryResolver } from './resolvers/queries.resolver';
import { RentMutationResolver } from './resolvers/mutations.resolver';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PubsubModule } from '../pubsub/pubsub.module';
import { NotificationModule } from '../notification/notification.module';
// import { RentSubscriptionsResolver } from './resolvers/subscriptions.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'RentBook', schema: RentBookSchema}
    ]),
    forwardRef(() => BooksModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => PubsubModule),
    forwardRef(() => NotificationModule)
  ],
  providers: [RentQueryResolver, RentMutationResolver, RentService],
  exports: [RentQueryResolver, RentMutationResolver, RentService]
})
export class RentModule {}
