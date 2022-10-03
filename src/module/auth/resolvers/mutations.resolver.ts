import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "src/module/users/entities/user.entity";
import { UsersService } from "src/module/users/users.service";
import { SignUpInput } from "../dto/sign-up.input";

@Resolver(() => User)
export class AuthMutationResolver {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Mutation(() => User)
    signUp(@Args('signUpInput') signUpInput: SignUpInput) {
        return this.usersService.create(signUpInput);
    }
}