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
const pubSub = new PubSub();
@Resolver(() => OrderS)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private notificationService: NotificationService,
  ) {}
  @Subscription(() => Notification, {
    resolve: (data) => data,
  })
  async notificationOrder() {
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
    const createdNotification = await this.notificationService.create(
      'notification_order',
      {
        ownerID: user?.userID,
        content: 'order created',
        type: NotificationTypes.created,
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
  ) {
    return await this.orderService.update(updateOrderInput);
  }

  @Mutation(() => OrderS)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.remove(id);
  }
}
