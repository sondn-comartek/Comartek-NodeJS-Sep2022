import { NotificationTypes } from './../notification/enums/notification.enum';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderS } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/enums/roles.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from '../auth/current.user';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/entities/notification.entity';
import { UserService } from '../user/user.service';
import { ObjectId, Types } from 'mongoose';
import * as _ from 'lodash';
const pubSub = new PubSub();
@Resolver(() => OrderS)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private notificationService: NotificationService,
    private userService: UserService,
  ) {}
  @Subscription(() => Notification, {
    resolve: (data) => data,
    filter: (payload, variables) => {
      const recipients = payload.recipients;
      const userID = variables?.userID;
      const recipientsConverter = _.map(recipients, (item) => {
        return String(item);
      });
      const isMatch = _.includes(recipientsConverter, userID);
      return isMatch;
    },
  })
  async notificationOrder(@Args('userID') userID: string) {
    return await this.notificationService.listen('notification_order');
  }
  @Mutation(() => OrderS, { name: 'create_order' })
  @Roles(Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() user: any,
  ) {
    const createdOrder = await this.orderService.create(createOrderInput);
    const recipients = await this.userService.findByCondition({
      role: Role.admin,
    });
    let recipientsIds = [];
    recipientsIds = _.map(recipients, '_id');
    const createdNotification = await this.notificationService.create(
      'notification_order',
      {
        ownerID: user?.userID,
        content: 'order created',
        type: NotificationTypes.created,
        recipients: recipientsIds,
      },
    );
    pubSub.publish('order_notification', createdNotification);
    return createdOrder;
  }
  @Query(() => [OrderS], { name: 'orders' })
  findAll() {
    return this.orderService.findAll();
  }
  @Query(() => OrderS, { name: 'order' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => OrderS)
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
    @CurrentUser() user: any,
  ) {
    const updatedOrder = await this.orderService.update(updateOrderInput);
    const recipients = await this.userService.findByCondition({
      _id: updatedOrder.userID,
    });
    let recipientsIds = [];
    recipientsIds = _.map(recipients, '_id');
    const createdNotification = await this.notificationService.create(
      'notification_order',
      {
        ownerID: user?.userID,
        content: `order ${updateOrderInput.status}`,
        type: NotificationTypes.created,
        recipients: recipientsIds,
      },
    );
    pubSub.publish('order_notification', createdNotification);
    return updatedOrder;
  }
  @Mutation(() => OrderS)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.remove(id);
  }
}
