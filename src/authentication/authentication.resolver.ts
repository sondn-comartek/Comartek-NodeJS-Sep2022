import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthenticationResolver {
  @Query(() => String)
  hello(): string {
    return 'hello';
  }
}
