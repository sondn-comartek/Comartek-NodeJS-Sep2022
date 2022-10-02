import { registerEnumType } from '@nestjs/graphql';

export enum RentStatusEnum {
  PROCESSING = 'PROCESSING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
  DONE = 'DONE',
}

registerEnumType(RentStatusEnum, {
  name: 'RentStatusEnum',
});
