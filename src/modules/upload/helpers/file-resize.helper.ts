import * as sharp from 'sharp';
import { Media } from 'src/modules/media/schemas/media.schema';

export class FileResizeHelper {
  async resizeFile(
    media: Media,
    width: number,
    height: number,
    buffer: Buffer,
  ): Promise<void> {
    await sharp(
      `store/origin/${media._id.toString()}.${media.mimetype.split('/')[1]}`,
    )
      .webp()
      .toFile(`store/webp/${media._id.toString()}.webp`);

    await sharp(
      `store/origin/${media._id.toString()}.${media.mimetype.split('/')[1]}`,
    )
      .resize(width, height)
      .toFile(
        `store/resize/${media._id.toString()}.${media.mimetype.split('/')[1]}`,
      );
  }
}
