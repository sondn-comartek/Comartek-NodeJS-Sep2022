import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { createWriteStream } from 'fs';
import { ResizingHelper } from 'src/helper/image.resize';
import { finished } from 'stream/promises';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediaService {
  constructor(@InjectQueue('media') private mediaQueue: Queue) {}
  async upload(createMedia: CreateMediaDto): Promise<String> {
    const { createReadStream, filename } = await createMedia?.media;
    const pathImage = `${process.env.PATH_IMAGE_SAVE_CATEGORY_ORIGIN}${filename}`;
    const stream = await createReadStream();
    const out = await createWriteStream(pathImage);
    await stream.pipe(out);
    await finished(out);
    await this.mediaQueue.add('resizing', { path: pathImage, size: 120 });
    return 'uploader';
  }
}
