import { UserSchema } from './../user/schemas/user.schema';
import { UserModule } from './../user/user.module';
import { BookQueryResolver } from './resolvers/book-query.resolver';
import { Book, BookSchema } from './schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { BookService } from './book.service';
import { CategoryModule } from '../category/category.module';
import { MediaModule } from '../media/media.module';
import { BookMutationResolver } from './resolvers/book-mutation.resolver';
import { PubSubModule } from '../pubsub/pubsub.module';
import { BookSubscriptionResolver } from './resolvers/book-subscription.resolver';
import { User } from '../user/schemas/user.schema';

@Module({
  imports: [
    CategoryModule,
    MediaModule,
    PubSubModule,
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    BookService,
    BookMutationResolver,
    BookQueryResolver,
    BookSubscriptionResolver,
  ],
  exports: [BookService],
})
export class BookModule {}
