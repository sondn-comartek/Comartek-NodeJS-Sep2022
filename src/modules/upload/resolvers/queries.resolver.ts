import { Resolver, Query, Args } from '@nestjs/graphql';
import { UploadImage } from '../entities/upload.entity';
import { UploadService } from '../services/upload.service';

@Resolver(() => UploadImage)
export class UploadQuery {
  constructor(private readonly uploadService: UploadService) {}

  @Query(() => [UploadImage], { name: 'uploads' })
  async findAll() {
    return await this.uploadService.findAll();
  }

  @Query(() => UploadImage, { name: 'upload' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.uploadService.findOne(id);
  }
}
