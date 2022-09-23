import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { ApproveOrderInput } from './dto/approve-order.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  // @Query(() => [Order], { name: 'orders' })
  // findAll() {
  //   return this.ordersService.findAll();
  // }

  @Query(() => Order, { name: 'findOrderById' })
  @UseGuards(JwtAuthGuard)
  findById(@Args('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async approveOrder(
    @Args('approveOrderInput') approveOrderInput: ApproveOrderInput,
  ) {
    return await this.ordersService.approveOrder(
      approveOrderInput.id,
      approveOrderInput,
    );
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  removeOrder(@Args('id') id: string) {
    return this.ordersService.remove(id);
  }
}
