import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../shared/schemas/user.schema';
import { CreateUserInput } from '../shared/inputs/create-user.input';
import { AuthenticationService } from './authentication.service';
import { SignInInput } from '../shared/inputs/sign-in-input';
import { SignInResponse } from '../shared/types/sign-in-response.type';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  hello(): string {
    return 'Hello, World!';
  }

  @Mutation(() => User)
  async signUp(
    @Args({ name: 'createUserInput', type: () => CreateUserInput })
    createUserInput: CreateUserInput,
  ) {
    return await this.authenticationService.signUp(createUserInput);
  }

  @Mutation(() => SignInResponse)
  async signIn(
    @Args({ name: 'signInInput', type: () => SignInInput })
    signInInput: SignInInput,
  ) {
    return await this.authenticationService.signIn(signInInput);
  }
}
