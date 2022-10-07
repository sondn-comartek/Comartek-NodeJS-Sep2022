import { Resolver , Mutation , Query ,Args } from '@nestjs/graphql';
import { UploadImageInput } from './dto';
import { ImageService } from './image.service';
import { Image } from './models';

@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Mutation( () => Image)
  uploadImage(@Args('uploadImageInput') uploadImageInput:UploadImageInput){
    return this.imageService.upload(uploadImageInput)
  }
}
