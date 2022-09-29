import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { BullModule } from '@nestjs/bull';
import { ImageConsumer } from './image.consumer';
import { ResizeHelper } from './helpers';

@Module({
  imports : [
    BullModule.registerQueue({
      name: 'image',
    })
  ] ,
  providers: [ImageResolver, ImageService , ImageConsumer , ResizeHelper]
})
export class ImageModule {}
