import { AuthResDto } from './dto/auth-res.dto';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input.dto';

@Resolver(() => AuthResDto)
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Query(() => AuthResDto, { name: 'login' })
  async login(@Args('account', { type: () => AuthInput }) account: AuthInput) {
    try {
      const userValid = await this.authService.validateUser(
        account?.email,
        account?.password,
      );
      const token = await this.authService.login(userValid);
      return { access_token: token, user: userValid };
    } catch (error) {
      throw new Error(error);
    }
  }
}
