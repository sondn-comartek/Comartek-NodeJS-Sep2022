import { UploadFileInput } from './inputs/upload-file.input';
import { join } from 'path';
import { MediaService } from './../media/media.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream, readFileSync } from 'fs';
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
    const { mimetype, createReadStream } = await uploadFileInput.file;
    const { height, width } = uploadFileInput;

    const createMediaInput: CreateMediaInput = {
      mimetype,
    };
    const media = await this.mediaService.create(createMediaInput);

    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(
          createWriteStream(
            join(
              process.cwd(),
              `store/origin/${media._id.toString()}.${
                media.mimetype.split('/')[1]
              }`,
            ),
          ),
        )
        .on('finish', async () => {
          // Add to queue
          await this.fileQueue.add('resize', {
            height,
            width,
            media,
            buffer: readFileSync(
              `store/origin/${media._id.toString()}.${
                media.mimetype.split('/')[1]
              }`,
            ),
          });

          return resolve(media);
        })
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });
    });
  }
}
