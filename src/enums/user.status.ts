import { registerEnumType } from '@nestjs/graphql';
export enum UserStatus {
  'active',
  'inactive',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
});
