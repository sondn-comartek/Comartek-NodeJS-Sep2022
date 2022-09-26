import { CloudinaryService } from './cloudinary.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class CloudinaryResolver {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Mutation(() => String)
  async exampleUploadToCloud(
    @Args({ name: 'file', type: () => String }) file: string,
  ) {
    return await this.cloudinaryService.exampleUploadToCloud(file);
  }
}
