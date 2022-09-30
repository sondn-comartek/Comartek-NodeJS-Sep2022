import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  'admin',
  'user',
}

registerEnumType(Role, {
  name: 'Role',
});
