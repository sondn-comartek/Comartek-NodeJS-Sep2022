import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tag } from '../shared/schemas/tag.schema';
import { CreateTagInput } from '../shared/inputs/create-tag.input';
import { TagService } from './tag.service';

@Resolver()
export class TagResolver {
  constructor(private readonly tagService: TagService) {}
  // get all tag, get tag by id, create tag, delete tag, update tag
  @Query(() => [Tag])
  async findAllTag(): Promise<Tag[]> {
    return await this.tagService.findAllTag();
  }

  @Mutation(() => Tag)
  async createTag(
    @Args({ name: 'createTagInput', type: () => CreateTagInput })
    createTagInput: CreateTagInput,
  ): Promise<Tag> {
    return await this.tagService.createTag(createTagInput);
  }
}
