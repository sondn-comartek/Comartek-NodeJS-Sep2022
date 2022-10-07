import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createWriteStream, open, mkdirSync } from 'fs';
import { join } from 'path';
import { GeneratePhotoId } from 'src/ultils';
import { UploadPhotoInput } from './dto';
const uploadPath = join(process.cwd(), "./src/upload/")

@Injectable()
export class PhotoService {
  async upload({ description, file }: UploadPhotoInput) {
    const { createReadStream, filename } = await file
    const photo_id = GeneratePhotoId(filename, description)
    return new Promise(async (resolve) => {
      open(uploadPath, (err) => {
        if (err) mkdirSync(uploadPath)
        createReadStream()
          .pipe(createWriteStream(join(uploadPath + photo_id)))
          .on('finish', () =>
            resolve({
              photo_url: photo_id,
              description: description
            }),
          )
          .on('error', () => {
            new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
          });
      });
    })

  }
}