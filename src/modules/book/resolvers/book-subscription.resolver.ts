import { Book } from 'src/modules/book/schemas/book.schema';
import { PubSubService } from 'src/modules/pubsub/pubsub.service';
import { Parent, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Notification } from 'src/modules/notification/schemas/notification.schema';
import { Loader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { BookLoader } from 'src/modules/loader/loader.book';
import { UserService } from 'src/modules/user/user.service';

@Resolver(() => Notification)
export class BookSubscriptionResolver {
  constructor(
    private readonly pubSubService: PubSubService,
    private readonly userService: UserService,
  ) {}

  @Subscription(() => Notification, {
    resolve: (payload) => payload?.notification,
    filter: async (payload, variables, context) => {
      const userId: string = context?.user?._id;
      // Kiểm tra user có đăng ký nhận thông báo hay không

      return true;
    },
  })
  async getBookAddedNotification() {
    return await this.pubSubService.listenEvent('bookAdded');
  }

  @ResolveField(() => Book)
  async bookInfo(
    @Parent() notification: Notification,
    @Loader(BookLoader) bookLoader: DataLoader<Notification['entityId'], Book>,
  ): Promise<Book> {
    return await bookLoader.load(notification.entityId);
  }
}
