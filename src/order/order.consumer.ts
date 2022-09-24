import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { OrderService } from './order.service';

@Processor('order')
export class OrderConsumer {
  constructor(private readonly orderService: OrderService) { }

  @Process('handleCreateOrder')
  async handleCreateOrder(job: Job<unknown>) {
    // calculate order price
    // update pet status
    console.log({ job });

    return 'done';
  }
}
