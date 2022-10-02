import { MediaModule } from './../media/media.module';
import { UploadMutationResolver } from './resolvers/upload-mutation.resolver';
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MediaModule,
    BullModule.registerQueue({
      name: 'file-processor',
    }),
  ],
  providers: [UploadMutationResolver, UploadService],
})
export class UploadModule {}
