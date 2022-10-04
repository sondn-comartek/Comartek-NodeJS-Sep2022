import * as sharp from 'sharp';

export class FileResizeHelper {
  async resizeFile(
    filename: string,
    width: number,
    height: number,
    buffer,
  ): Promise<void> {
    await sharp(`store/origin/${filename}`)
      .webp()
      .toFile(`store/webp/${filename}.webp`);

    await sharp(`store/origin/${filename}`)
      .resize(width, height)
      .toFile(`store/resize/${filename}`);
  }
}
