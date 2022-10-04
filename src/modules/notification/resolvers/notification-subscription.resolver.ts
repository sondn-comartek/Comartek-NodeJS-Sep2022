import { Notification } from './../schemas/notification.schema';
import { Resolver } from '@nestjs/graphql';

@Resolver(() => Notification)
export class NotificationSubscriptionResolver {}
