import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/module/users/entities/user.entity";
import { AuthService } from "../auth.service";
import { SignInInput } from "../dto/sign-in.input";
import { SignInResponse } from "../entities/sign-in-response.entity";

@Resolver(() => User)
export class AuthQueryResolver {
	constructor(
		private readonly authService: AuthService
	) { }

	@Query(() => SignInResponse)
	signIn(@Args('signInInput') signInInput: SignInInput) {
		return this.authService.login(signInInput);
	}
}