import { QueryMongoIdInput } from './../shared/inputs/query-mongo-id.input';
import { OrderResponseType } from './../shared/types/order-response.type';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { CreateOrderInput } from '../shared/inputs/create-order.input';
import { CurrentUser } from 'src/authentication/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { Admin } from 'src/authentication/decorators/admin.decorator';
import { UpdateOrderStatusInput } from 'src/shared/inputs/update-order-status.input';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => OrderResponseType)
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @CurrentUser() currentUser: any,
    @Args({ name: 'createOrderInput', type: () => CreateOrderInput })
    createOrderInput: CreateOrderInput,
  ): Promise<OrderResponseType> {
    return await this.orderService.createOrder(
      currentUser._id,
      createOrderInput,
    );
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async updateOrderStatus(
    @Admin() admin: any,
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({
      name: 'updateOrderStatusInput',
      type: () => UpdateOrderStatusInput,
    })
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<string> {
    return await this.orderService.updateOrderStatus(
      id,
      updateOrderStatusInput,
    );
  }

  @Query(() => OrderResponseType)
  async findOrderById(
    @Args({ name: 'queryMongoIdInput', type: () => QueryMongoIdInput })
    queryMongoIdInput: QueryMongoIdInput,
  ): Promise<OrderResponseType> {
    return await this.orderService.findOrderById(queryMongoIdInput.id);
  }

  @Mutation(() => String)
  async deleteOrder(
    @Args({ name: 'queryMongoIdInput', type: () => QueryMongoIdInput })
    queryMongoIdInput: QueryMongoIdInput,
  ): Promise<string> {
    return await this.orderService.deleteOrder(queryMongoIdInput.id);
  }
}
