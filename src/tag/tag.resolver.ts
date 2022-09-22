import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tag } from '../shared/schemas/tag.schema';
import { CreateTagInput } from '../shared/inputs/create-tag.input';

@Resolver()
export class TagResolver {
  // constructor() { }
  // get all tag, get tag by id, create tag, delete tag, update tag
  // @Query(() => [Tag])
  // async findAllTag() { }
  // @Mutation(() => Tag)
  // async createTag(@Args({ name: "createTagInput", type: () => Tag }) createTagInput: CreateTagInput) { }
}
