import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { ResizingHelper } from 'src/helper/image.resize';
import { MediaConsumer } from './consumers/media.consumers';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'media',
    }),
  ],
  providers: [MediaResolver, MediaService, MediaConsumer, ResizingHelper],
})
export class MediaModule {}
