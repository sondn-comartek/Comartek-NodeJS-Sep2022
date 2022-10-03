import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './entities/image.entity';
import { BullModule } from '@nestjs/bull';
import { ImageQueryResolver } from './resolvers/queries.resolver';
import { ImageMutationResolver } from './resolvers/mutations.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Image', schema: ImageSchema}]),
    BullModule.registerQueue({
      name: 'uploadImage',
    }),
  ],
  providers: [ImageQueryResolver, ImageMutationResolver, ImagesService],
  exports: [ImageQueryResolver, ImageMutationResolver, ImagesService]
})
export class ImagesModule {}
