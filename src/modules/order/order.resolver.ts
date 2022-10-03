import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderS } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/enums/roles.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Resolver(() => OrderS)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => OrderS, { name: 'create_order' })
  @Roles(Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return await this.orderService.create(createOrderInput);
  }

  @Query(() => [OrderS], { name: 'order' })
  findAll() {
    return this.orderService.findAll();
  }

  @Query(() => OrderS, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number) {
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
