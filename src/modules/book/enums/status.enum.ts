import { registerEnumType } from '@nestjs/graphql';
export enum BookStatus {
  available,
  unavailable,
}
registerEnumType(BookStatus, {
  name: 'BookStatus',
});
