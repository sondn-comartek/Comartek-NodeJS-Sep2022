enum Role {
  Admin = 'admin',
  Customer = 'customer',
}

export class CreateUserDto {
  email: string;
  password: string;
  username: string;
  role: Role;
}
