import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { createWriteStream } from 'fs';
import { Model } from 'mongoose';
import { finished } from 'stream/promises';
import { CreateMediaDto } from './dto/create-media.dto';
import { Media, MediaDocument } from './entities/media.entity';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class MediaService {
  constructor(
    @InjectQueue('media') private mediaQueue: Queue,
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
  ) {}
  async upload(createMedia: CreateMediaDto): Promise<Media> {
    const { createReadStream, filename } = await createMedia?.media;
    const pathImage = `${process.env.PATH_IMAGE_SAVE_CATEGORY_ORIGIN}${filename}`;
    const stream = await createReadStream();
    const out = await createWriteStream(pathImage);
    await stream.pipe(out);
    await finished(out);
    const pathResizeFile = `${
      process.env.PATH_IMAGE_SAVE_CATEGORY
    }${uuidV4()}.webp`;
    await this.mediaQueue.add('resizing', {
      path: pathImage,
      path_resize: pathResizeFile,
      size: 120,
    });
    const createdMedia = await this.mediaModel.create({
      mediaID: uuidV4(),
      description: createMedia?.description,
      media_urls: pathResizeFile,
    });
    return createdMedia;
  }
}
