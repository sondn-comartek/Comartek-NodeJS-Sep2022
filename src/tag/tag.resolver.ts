import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTagInput } from '../shared/inputs/create-tag.input';
import { TagService } from './tag.service';
import { TagResponseType } from '../shared/types/tag-response.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { Admin } from 'src/authentication/decorators/admin.decorator';

@Resolver()
export class TagResolver {
  constructor(private readonly tagService: TagService) {}
  @Query(() => [TagResponseType])
  async findAllTag(): Promise<TagResponseType[]> {
    return await this.tagService.findAllTag();
  }

  @Mutation(() => TagResponseType)
  @UseGuards(JwtAuthGuard)
  async createTag(
    @Admin() admin: any,
    @Args({ name: 'createTagInput', type: () => CreateTagInput })
    createTagInput: CreateTagInput,
  ): Promise<TagResponseType> {
    return await this.tagService.createTag(createTagInput);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async updateTagById(
    @Admin() admin: any,
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({ name: 'updateTagInput', type: () => CreateTagInput })
    updateTagInputd: CreateTagInput,
  ): Promise<string> {
    return 'Developing...';
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async deleteTagById(
    @Admin() admin: any,
    @Args({ name: 'id', type: () => String }) id: string,
  ): Promise<string> {
    return 'Developing...';
  }
}
