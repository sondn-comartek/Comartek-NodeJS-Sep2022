import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/model'
import { LoginInput, RegiserInput } from './dto';
import { JwtTokens } from './models';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation( () => User )
  register( @Args('regiserInput') regiserInput: RegiserInput){
    return this.authService.signup(regiserInput);
  }

  @Query( () => JwtTokens ) 
  login( @Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput)
  }
}
