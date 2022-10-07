import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { BullModule } from '@nestjs/bull';
import { ImageConsumer } from './image.consumer';
import { ResizeHelper } from './helpers';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './models';
import { ImageRepository } from './image.repository';

@Module({
  imports : [
    BullModule.registerQueue({
      name: 'image',
    }), 
    MongooseModule.forFeature([{
      name : Image.name ,
      schema : ImageSchema
    }]),
    ConfigModule ,
  ] ,
  providers: [
     ImageResolver,
     ImageService , 
     ImageConsumer , 
     ResizeHelper ,
     ImageRepository 
    ] ,
  exports : [ImageRepository , ImageService , MongooseModule]
})
export class ImageModule {}
