import { registerEnumType } from '@nestjs/graphql';

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(UserRoleEnum, {
  name: 'UserRoleEnum',
});
