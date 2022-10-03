import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class HelpersService {
  async convertImage(filename, name, widthImage) {
    const input = process.cwd() + `\\src\\stores\\images\\origin\\${filename}`;
    const outputThumb =
      process.cwd() + `\\src\\stores\\images\\thumb\\${name}_thumb.webp`;
    const outputPreview =
      process.cwd() + `\\src\\stores\\images\\preview\\${name}_preview.webp`;
    const outputCustom =
      process.cwd() +
      `\\src\\stores\\images\\custom\\${name}_custom_w${widthImage}.jpg`;

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
