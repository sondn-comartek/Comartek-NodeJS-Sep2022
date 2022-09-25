import { OrderResponseType } from './../shared/types/order-response.type';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { CreateOrderInput } from '../shared/inputs/create-order.input';
import { CurrentUser } from 'src/authentication/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => OrderResponseType)
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @CurrentUser() currentUser: any,
    @Args({ name: 'createOrderInput', type: () => CreateOrderInput })
    createOrderInput: CreateOrderInput,
  ) {
    return await this.orderService.createOrder(
      currentUser._id,
      createOrderInput,
    );
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async updateApprovedOrder() {}
}
