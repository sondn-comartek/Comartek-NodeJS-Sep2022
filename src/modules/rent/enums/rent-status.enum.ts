import { registerEnumType } from '@nestjs/graphql';

export enum RentStatusEnum {
  PROCESSING = 'PROCESSING',
  PLACED = 'PLACED',
  DENIED = 'DENIED',
  DONE = 'DONE',
}

registerEnumType(RentStatusEnum, {
  name: 'RentStatusEnum',
});
