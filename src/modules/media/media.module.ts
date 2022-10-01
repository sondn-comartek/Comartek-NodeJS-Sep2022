import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { ResizingHelper } from 'src/helper/image.resize';
import { MediaConsumer } from './consumers/media.consumers';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from './entities/media.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
    BullModule.registerQueue({
      name: 'media',
    }),
  ],
  providers: [MediaResolver, MediaService, MediaConsumer, ResizingHelper],
})
export class MediaModule {}
