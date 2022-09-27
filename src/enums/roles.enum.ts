import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  'admin',
  'user',
}

registerEnumType(Roles, {
  name: 'Roles',
});
