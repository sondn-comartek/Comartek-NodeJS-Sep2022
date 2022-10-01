import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { SignInInput } from './../inputs/sign-in.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/modules/user/inputs/create-user.input';
import { AuthService } from '../auth.service';
import { AuthResponseType } from '../types/auth-response.type';

@Resolver(() => AuthResponseType)
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseType)
  async signUp(
    @Args({ name: 'createUserInput', type: () => CreateUserInput })
    createUserInput: CreateUserInput,
  ): Promise<AuthResponseType> {
    return await this.authService.signUp(createUserInput);
  }

  @Mutation(() => AuthResponseType)
  async signIn(
    @Args({ name: 'signInInput', type: () => SignInInput })
    signInInput: SignInInput,
  ): Promise<AuthResponseType> {
    return await this.authService.signIn(signInInput);
  }
}
