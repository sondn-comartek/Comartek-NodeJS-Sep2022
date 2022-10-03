import { NestDataLoader } from 'nestjs-dataloader';
import { Injectable } from '@nestjs/common';
import { Order } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';
import DataLoader from 'dataloader';

@Injectable()
export class OrderLoader implements NestDataLoader<string, Order> {
  constructor(private readonly orderService: OrderService) {}
  generateDataLoader(): DataLoader<string, Order> {
    return new DataLoader<string, Order>((keys) =>
      this.orderService.findByIds(keys),
    );
  }
}
