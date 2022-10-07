import { Resolver, Subscription } from '@nestjs/graphql';
import { Book } from 'src/modules/books/entities/book.entity';
import { PubsubService } from 'src/modules/pubsub/pubsub.service';
import { User } from '../entities/user.entity';

@Resolver(() => User)
export class UsersSubscription {
  constructor(private readonly pubsubService: PubsubService) {}

  @Subscription(() => String, {
    resolve: (value) => value.requestBorrow,
  })
  requestBorrow() {
    return this.pubsubService.subscribeEvent('requestBorrow');
  }

  @Subscription(() => String, {
    resolve: (value) => value.responseBorrow,
  })
  responseBorrow() {
    return this.pubsubService.subscribeEvent('responseBorrow');
  }

  @Subscription(() => Book, {
    resolve: (value) => value.createNewBook,
  })
  createNewBook() {
    return this.pubsubService.subscribeEvent('createNewBook');
  }

  @Subscription(() => String, {
    resolve: (value) => value.exportBooks,
  })
  exportBooks() {
    return this.pubsubService.subscribeEvent('exportBooks');
  }
}
