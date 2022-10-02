import { MediaService } from './../media.service';
import { Media } from './../schemas/media.schema';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';

@Resolver(() => Media)
export class MediaQueryResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => [Media])
  async findAllMedia(
    @Args({
      name: 'queryArgsInput',
      type: () => QueryArgsInput,
      nullable: true,
      defaultValue: { limit: 0, skip: 0 },
    })
    queryArgsInput?: QueryArgsInput,
  ): Promise<Media[]> {
    return await this.mediaService.findAll(queryArgsInput);
  }
}
