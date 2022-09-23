import { Mutation, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
    constructor(private readonly orderService: OrderService) { }

    @Mutation(() => String)
    async createOrder() { }
}
