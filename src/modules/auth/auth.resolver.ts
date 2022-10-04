import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signup.input';
import { SignInInput } from './dto/signin.input';
import { UnauthorizedError } from 'type-graphql';
import { Auth } from './model/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => Auth)
  async signUp(@Args('signUpData') signUpData: SignUpInput ) {
    await this.authService.createNewUser(signUpData)   
    return {
      status: 200,
      message: "create account scuccess"
    }
  }
  @Mutation(() => Auth)
  async signIn(@Args('loginData') signInData: SignInInput) {
    const jwt = await this.authService.login(signInData.username, signInData.password)
    if(jwt) {
      return {
        status: 200,
        message: "Login scuccess",
        jwt: jwt,
        name: signInData.username
      }
    }
    throw new UnauthorizedError()
  }

  @ResolveField()
  async user(@Parent() auth: Auth) {
    const {name} = auth;
    const user = await this.authService.getUserByName(name)
    return user
  }
}
