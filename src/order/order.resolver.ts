import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return await this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  async findOne(@Args('orderID', { type: () => String }) id: string) {
    return await this.orderService.findOne(id);
  }

  @Mutation(() => Order, { name: 'approve' })
  async updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ) {
    return await this.orderService.update(updateOrderInput);
  }

  @Mutation(() => Order, {name: "removeOrder"})
  removeOrder(@Args('id', { type: () => String }) id: string) {
    return this.orderService.remove(id);
  }
}
