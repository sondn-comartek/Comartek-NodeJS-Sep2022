import { UploadImageInput } from './../shared/inputs/upload-image.input';
import { CloudinaryService } from './cloudinary.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class CloudinaryResolver {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Mutation(() => String)
  async exampleUpload(
    @Args({ name: 'uploadImageInput', type: () => UploadImageInput })
    uploadImageInput: UploadImageInput,
  ) {
    return await this.cloudinaryService.exampleUploadToCloud(uploadImageInput);
  }
}
