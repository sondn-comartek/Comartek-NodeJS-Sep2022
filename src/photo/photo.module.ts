import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Module({
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
