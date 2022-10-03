import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { UploadImage } from './entities/upload.entity';
import { CreateUploadInput } from './dto/create-upload.input';
import { UpdateUploadInput } from './dto/update-upload.input';

@Resolver(() => UploadImage)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => UploadImage)
  async createUpload(
    @Args('createUploadInput') createUploadInput: CreateUploadInput,
  ) {
    return await this.uploadService.create(createUploadInput);
  }

  @Query(() => [UploadImage], { name: 'uploads' })
  findAll() {
    return this.uploadService.findAll();
  }

  @Query(() => UploadImage, { name: 'upload' })
  async findOne(@Args('id', { type: () => Int }) id: string) {
    return await this.uploadService.findOne(id);
  }

  @Mutation(() => UploadImage)
  updateUpload(
    @Args('updateUploadInput') updateUploadInput: UpdateUploadInput,
  ) {
    return this.uploadService.update(updateUploadInput.id, updateUploadInput);
  }

  @Mutation(() => UploadImage)
  removeUpload(@Args('id', { type: () => Int }) id: number) {
    return this.uploadService.remove(id);
  }
}
