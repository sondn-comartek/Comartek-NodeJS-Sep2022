import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role } from 'src/modules/users/enums/role.enum';
import { CreateUploadInput } from '../dto/create-upload.input';
import { UpdateUploadInput } from '../dto/update-upload.input';
import { UploadImage } from '../entities/upload.entity';
import { UploadService } from '../services/upload.service';

@Resolver(() => UploadImage)
export class UploadMutation {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => UploadImage)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async createUpload(
    @Args('createUploadInput') createUploadInput: CreateUploadInput,
  ) {
    return await this.uploadService.create(createUploadInput);
  }

  @Mutation(() => UploadImage)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async updateUpload(
    @Args('updateUploadInput') updateUploadInput: UpdateUploadInput,
  ) {
    return await this.uploadService.update(
      updateUploadInput.id,
      updateUploadInput,
    );
  }

  @Mutation(() => UploadImage)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async removeUpload(@Args('id', { type: () => String }) id: string) {
    return await this.uploadService.remove(id);
  }
}
