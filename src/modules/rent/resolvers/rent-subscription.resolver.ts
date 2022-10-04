import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { Parent, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Notification } from 'src/modules/notification/schemas/notification.schema';
import { PubSubService } from 'src/modules/pubsub/pubsub.service';
import { Rent } from '../schemas/rent.schema';
import { RentLoader } from 'src/modules/loader/loader.rent';
import { UserRoleEnum } from 'src/modules/user/enums/user-role.enum';

@Resolver(() => Notification)
export class RentSubscriptionResolver {
  constructor(private readonly pubSubService: PubSubService) {}

  @Subscription(() => Notification, {
    resolve: (payload) => payload?.notification,
    filter: (payload, variables, context) => {
      return payload?.userIdOnRent === context?.user?._id;
    },
  })
  async getRentUpdatedNotification() {
    return await this.pubSubService.listenEvent('rentUpdated');
  }

  @Subscription(() => Notification, {
    resolve: (payload) => payload?.notification,
    filter: (payload, variables, context) => {
      return context?.user?.role === UserRoleEnum.ADMIN;
    },
  })
  async getRentCreatedNotification() {
    return await this.pubSubService.listenEvent('rentCreated');
  }

  @ResolveField(() => Rent)
  async rentInfo(
    @Parent() notification: Notification,
    @Loader(RentLoader) rentLoader: DataLoader<Notification['entityId'], Rent>,
  ): Promise<Rent> {
    return await rentLoader.load(notification.entityId);
  }
}
