import { Int, Mutation, Resolver } from '@nestjs/graphql';

@Resolver(() => Int)
export class ExtractDataMutationResolver {
  constructor() {}

  @Mutation(() => Int)
  async extractBookData() {
    // Return job ID
    return;
  }
}
