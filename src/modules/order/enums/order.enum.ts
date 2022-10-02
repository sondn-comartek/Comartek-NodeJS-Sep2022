import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  pending,
  accept,
  ignore,
}
registerEnumType(OrderStatus, {
  name: 'Order',
});
