import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';

@Resolver(() => String)
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Query(() => String, { name: 'login' })
  async login(@Args('account', { type: () => AuthInput }) account: AuthInput) {
    try {
      const userValid = await this.authService.validateUser(
        account?.email,
        account?.password,
      );
      const token = await this.authService.login(userValid);
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }
}
