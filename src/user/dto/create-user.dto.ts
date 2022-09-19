import { User } from './../interfaces/user.interface';
export class CreateUserDto implements User{
    email: string;
    username: string;
    password: string;
    role: string;
}
