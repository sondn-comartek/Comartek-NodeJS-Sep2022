import { AuthService } from './auth.service';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { LoginUserInput } from './dto/login-user.input';

@Resolver(() => String)
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Query(() => String)
  login(@Args('user', { type: () => LoginUserInput }) user: LoginUserInput) {
    return this.authService.userLogin(user);
  }
}
