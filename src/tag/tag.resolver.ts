import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tag } from '../shared/schemas/tag.schema';
import { CreateTagInput } from '../shared/inputs/create-tag.input';
import { TagService } from './tag.service';
import { TagResponseType } from '../shared/types/tag-response.type';

@Resolver()
export class TagResolver {
  constructor(private readonly tagService: TagService) { }
  @Query(() => [TagResponseType])
  async findAllTag(): Promise<TagResponseType[]> {
    return await this.tagService.findAllTag();
  }

  @Mutation(() => TagResponseType)
  async createTag(
    @Args({ name: 'createTagInput', type: () => CreateTagInput })
    createTagInput: CreateTagInput,
  ): Promise<TagResponseType> {
    return await this.tagService.createTag(createTagInput);
  }
}
