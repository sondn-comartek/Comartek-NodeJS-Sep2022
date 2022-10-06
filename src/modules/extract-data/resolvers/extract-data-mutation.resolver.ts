import { Media } from 'src/modules/media/schemas/media.schema';
import { UseGuards } from '@nestjs/common';
import { ExtractDataService } from './../extract-data.service';
import { Int, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Resolver(() => Media)
export class ExtractDataMutationResolver {
  constructor(private readonly extractDataService: ExtractDataService) {}

  // return job ID
  @Mutation(() => Media)
  @UseGuards(JwtAuthGuard)
  async extractBookData(): Promise<Media> {
    return await this.extractDataService.extractBookData();
  }
}
