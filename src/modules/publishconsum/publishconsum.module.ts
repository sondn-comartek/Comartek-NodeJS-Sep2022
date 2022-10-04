import { Module, Global } from '@nestjs/common';
import { ImageConsumer } from './image.consumer';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
import { ImagePublish } from './image.publish';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaSchema } from 'src/modules/schema/media.schema';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
      processors: [join(__dirname, 'imagies.childprocess.js')],
    }),
    MongooseModule.forFeature(
      [{
        name: 'media', schema: MediaSchema
      }]),
  ],
  providers: [ImageConsumer, ImagePublish],
  exports: [ImagePublish]
})

export class PublishConsumModule {
}
