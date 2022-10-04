import { Rent, RentSchema } from './schemas/rent.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './../book/book.module';
import { RentQueryResolver } from './resolvers/rent-query.resolver';
import { RentMutationResolver } from './resolvers/rent-mutation.resolver';
import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { Book, BookSchema } from '../book/schemas/book.schema';
import { RentSubscriptionResolver } from './resolvers/rent-subscription.resolver';

@Module({
  imports: [
    BookModule,
    MongooseModule.forFeature([
      {
        name: Rent.name,
        schema: RentSchema,
      },
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  providers: [
    RentService,
    RentMutationResolver,
    RentQueryResolver,
    RentSubscriptionResolver,
  ],
  exports: [RentService],
})
export class RentModule {}
