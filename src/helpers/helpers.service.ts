import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class HelpersService {
  async convertImage(
    input,
    outputThumb,
    outputPreview,
    outputCustom,
    widthImage,
  ) {
    await sharp(input)
      .resize(200, 200)
      .webp({ lossless: true })
      .toFile(outputThumb);

    await sharp(input)
      .resize(640, 480)
      .webp({ lossless: true })
      .toFile(outputPreview);

    await sharp(input)
      .resize({ width: widthImage })
      .webp({ lossless: true })
      .toFile(outputCustom);
  }
}
