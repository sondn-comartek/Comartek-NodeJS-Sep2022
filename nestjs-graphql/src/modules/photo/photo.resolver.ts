import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UploadPhotoInput } from './dto';
import { Photo } from './model';
import { PhotoService } from './photo.service';

@Resolver()
export class PhotoResolver {
  constructor(private readonly photoService: PhotoService) {}
  @Mutation( () => Photo ) 
  uploadPhoto(@Args('uploadPhotoInput') uploadPhotoInPut: UploadPhotoInput ) {
    return this.photoService.upload(uploadPhotoInPut);
  }
}
