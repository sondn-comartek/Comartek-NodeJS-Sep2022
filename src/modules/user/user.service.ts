import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto';
import { UserRepository } from './user.repository'
@Injectable()
export class UserService {
  constructor(
    private readonly UserRepositoy: UserRepository
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}
