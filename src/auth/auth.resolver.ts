import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signup.input';
import { SignInOutput, SignUpOutput } from './entities/auth.output';
import { SignInInput } from './dto/signin.input';
import { UnauthorizedError } from 'type-graphql';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {

  }
  
  @Query(() => String, {name: 'rootquery'})
  rootQuery() {
    return "root query"
  }

  @Mutation(() => SignUpOutput)
  async signUp(@Args('signUpData') signUpData: SignUpInput ) {
    console.log("thissadasd")
    await this.authService.createNewUser(signUpData)   
    return {
      status: 200,
      message: "create account scuccess"
    }
  }
  @Mutation(() => SignInOutput)
  async signIn(@Args('loginData') signInData: SignInInput) {
    const jwt = await this.authService.login(signInData.username, signInData.password)
    if(jwt) {
      return {
        status: 200,
        message: "Login scuccess",
        jwt: jwt
      }
    }
    throw new UnauthorizedError()
  }

  
}
