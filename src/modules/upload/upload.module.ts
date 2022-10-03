import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadImage, UploadImageSchema } from './entities/upload.entity';

@Module({
  providers: [UploadResolver, UploadService],
  imports: [
    MongooseModule.forFeature([
      { name: UploadImage.name, schema: UploadImageSchema },
    ]),
  ],
  exports: [UploadService],
})
export class UploadModule {}
