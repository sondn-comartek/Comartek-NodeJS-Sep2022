import { UploadFileInput } from './inputs/upload-file.input';
import { join } from 'path';
import { MediaService } from './../media/media.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { CreateMediaInput } from '../media/inputs/create-media.input';
import { Media } from '../media/schemas/media.schema';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class UploadService {
  constructor(
    private readonly mediaService: MediaService,
    @InjectQueue('file-processor') private readonly fileQueue: Queue,
  ) {}

  async upload(uploadFileInput: UploadFileInput): Promise<Media> {
    const { filename, mimetype, createReadStream } = await uploadFileInput.file;
    const { height, width } = uploadFileInput;

    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(
          createWriteStream(
            join(process.cwd(), `src/modules/upload/store/${filename}`),
          ),
        )
        .on('finish', async () => {
          // Add to queue
          await this.fileQueue.add('resize', {
            filename,
            height,
            width,
          });

          const createMediaInput: CreateMediaInput = {
            filename,
            mimetype,
          };
          const media = await this.mediaService.create(createMediaInput);

          return resolve(media);
        })
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });
    });
  }
}
