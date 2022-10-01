import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateMediaDto } from './dto/create-media.dto';
import { Media } from './entities/media.entity';
import { MediaService } from './media.service';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private mediaService: MediaService) {}
  @Mutation(() => Media, { name: 'upload_media' })
  async uploadMedia(@Args('media') createMediaDto: CreateMediaDto) {
    return await this.mediaService.upload(createMediaDto);
  }
}
