import { Module, Global } from '@nestjs/common';
import { ImageConsumer } from './image.consumer';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
import { ImagePublish } from './image.publish';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
      processors: [join(__dirname, 'imagies.childprocess.js')],
    }),
  ],
  providers: [ImageConsumer, ImagePublish],
  exports: [ImagePublish]
})

export class PublishConsumModule {
}
