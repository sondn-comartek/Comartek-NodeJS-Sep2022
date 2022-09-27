import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/register-auth.input';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.authService.register(createUserInput);
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => Auth)
  login(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.login(createAuthInput);
  }
}
