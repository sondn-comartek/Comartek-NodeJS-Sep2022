import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sharp from 'sharp';
@Injectable()
export class ResizingHelper {
  resize(path, pathResize, size) {
    sharp(path).resize({ width: size }).toFormat('webp').toFile(pathResize);
    return {};
  }
}
