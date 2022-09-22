import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { ApproveOrderInput } from './dto/approve-order.input';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  // @Query(() => [Order], { name: 'orders' })
  // findAll() {
  //   return this.ordersService.findAll();
  // }

  @Query(() => Order, { name: 'findOrderById' })
  findById(@Args('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  async approveOrder(
    @Args('approveOrderInput') approveOrderInput: ApproveOrderInput,
  ) {
    return await this.ordersService.approveOrder(
      approveOrderInput.id,
      approveOrderInput,
    );
  }

  @Mutation(() => Order)
  removeOrder(@Args('id') id: string) {
    return this.ordersService.remove(id);
  }
}
