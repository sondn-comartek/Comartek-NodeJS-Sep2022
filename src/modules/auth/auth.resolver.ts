import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/register-auth.input';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => User)
  async register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.authService.register(createUserInput);
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => Auth)
  async login(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return await this.authService.login(createAuthInput);
  }
}
