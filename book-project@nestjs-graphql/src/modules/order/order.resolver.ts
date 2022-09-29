import { Resolver , Mutation , Query , Args } from '@nestjs/graphql';
import { CreateOrderInput } from './dto';
import { Order } from './models';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}
  @Mutation( () => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput){
    return this.orderService.create(createOrderInput)
  }
}
