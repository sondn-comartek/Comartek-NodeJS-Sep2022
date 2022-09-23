import { registerEnumType } from '@nestjs/graphql';
export enum PetStatus {
  'available',
  'unavailable',
}

registerEnumType(PetStatus, {
  name: 'PetStatus',
});
