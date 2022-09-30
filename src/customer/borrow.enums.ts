import { registerEnumType } from '@nestjs/graphql';
export enum BorrowStatus {
  accept,
  ignore,
  pending
}
registerEnumType(BorrowStatus, {
  name: 'borrow_status',
});
