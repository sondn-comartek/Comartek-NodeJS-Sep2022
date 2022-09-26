import { join } from 'path';
import { UploadImageInput } from './../shared/inputs/upload-image.input';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream } from 'fs';

@Injectable()
export class CloudinaryService {
  async exampleUploadToCloud(uploadImageInput: UploadImageInput) {
    const { createReadStream, filename } = await uploadImageInput.image;
    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(
          createWriteStream(join(process.cwd(), `./src/upload/${filename}`)),
        )
        .on('finish', () => {
          return resolve(filename);
        })
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });
    });
  }
}
