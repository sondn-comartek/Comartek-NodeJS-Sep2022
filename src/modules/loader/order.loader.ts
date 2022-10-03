import { NestDataLoader } from 'nestjs-dataloader';
import { Injectable } from '@nestjs/common';
import { OrderS } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';
import DataLoader from 'dataloader';

@Injectable()
export class OrderLoader implements NestDataLoader<string, OrderS> {
  constructor(private readonly orderService: OrderService) {}
  generateDataLoader(): DataLoader<string, OrderS> {
    return new DataLoader<string, OrderS>((keys) =>
      this.orderService.findByIds(keys),
    );
  }
}
