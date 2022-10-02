import { UploadService } from './../upload.service';
import { UploadFileInput } from './../inputs/upload-file.input';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Media } from 'src/modules/media/schemas/media.schema';

@Resolver(() => Media)
export class UploadMutationResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => Media)
  async uploadFile(
    @Args({ name: 'uploadFileInput', type: () => UploadFileInput })
    uploadFileInput: UploadFileInput,
  ): Promise<Media> {
    return await this.uploadService.upload(uploadFileInput)
  }
}
