import { Rent, RentSchema } from './schemas/rent.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './../book/book.module';
import { RentQueryResolver } from './resolvers/rent-query.resolver';
import { RentMutationResolver } from './resolvers/rent-mutation.resolver';
import { Module } from '@nestjs/common';
import { RentService } from './rent.service';

@Module({
  imports: [
    BookModule,
    MongooseModule.forFeature([
      {
        name: Rent.name,
        schema: RentSchema,
      },
    ]),
  ],
  providers: [RentService, RentMutationResolver, RentQueryResolver],
})
export class RentModule {}
