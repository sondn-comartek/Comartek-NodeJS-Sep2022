import { MediaSchema } from './schemas/media.schema';
import { Media } from 'src/modules/media/schemas/media.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Media.name,
        schema: MediaSchema,
      },
    ]),
  ],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
