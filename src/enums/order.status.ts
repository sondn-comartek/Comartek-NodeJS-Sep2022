import { registerEnumType } from '@nestjs/graphql';
export enum OrderStatus {
  'placed',
  'approved',
  'delivered',
}
registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});
