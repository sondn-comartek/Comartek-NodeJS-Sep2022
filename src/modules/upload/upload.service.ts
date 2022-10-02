import { UploadFileInput } from './inputs/upload-file.input';
import { join } from 'path';
import { MediaService } from './../media/media.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { CreateMediaInput } from '../media/inputs/create-media.input';
import { Media } from '../media/schemas/media.schema';

@Injectable()
export class UploadService {
  constructor(private readonly mediaService: MediaService) {}

  async upload(uploadFileInput: UploadFileInput): Promise<Media> {
    const { filename, mimetype, createReadStream } = await uploadFileInput.file;
    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(
          createWriteStream(
            join(process.cwd(), `src/upload/store/${filename}`),
          ),
        )
        .on('finish', async (buffer) => {
          // Resize here
          console.log({ buffer });
          const createMediaInput: CreateMediaInput = {
            filename,
            mimetype,
          };
          const media = await this.mediaService.create(createMediaInput);
          console.log({ media });
          return resolve(media);
        })
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });
    });
  }
}
