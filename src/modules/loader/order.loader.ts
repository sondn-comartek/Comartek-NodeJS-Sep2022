import { NestDataLoader } from 'nestjs-dataloader';
import { Injectable } from '@nestjs/common';
import { OrderS } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';
import * as DataLoader from 'dataloader';
import { User } from '../user/entities/user.entity';

@Injectable()
export class OrderLoader implements NestDataLoader<string, OrderS> {
  constructor(private readonly orderService: OrderService) {}
  generateDataLoader(): DataLoader<string, OrderS> {
    return new DataLoader<string, OrderS>(async (userIds) => {
      return await this.orderService.findByIds(userIds);
    });
  }
}
// @Injectable()
// export class UserOrderLoader implements NestDataLoader<string, OrderS> {
//   constructor(private readonly orderService: OrderService) {}
//   generateDataLoader(): DataLoader<string, OrderS> {
//     return new DataLoader<string, OrderS>(
//       async (userIds: string[]) =>
//         await this.orderService.findByCondition(userIds),
//     );
//   }
// }
