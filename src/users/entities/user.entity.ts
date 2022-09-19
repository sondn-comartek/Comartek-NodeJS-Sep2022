import { Role } from '../enums/role.enum';

export class User {
  email: string;
  password: string;
  username: string;
  roles: Role;
}
