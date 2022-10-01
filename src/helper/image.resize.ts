import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sharp from 'sharp';
import { v4 as uuidV4 } from 'uuid';
@Injectable()
export class ResizingHelper {
  resize(path, size) {
    const newPath = `${process.env.PATH_IMAGE_SAVE_CATEGORY}${uuidV4()}.webp`;
    sharp(path).resize({ width: 100 }).toFormat('webp').toFile(newPath);
    return newPath;
  }
}
