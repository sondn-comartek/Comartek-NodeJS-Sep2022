import * as sharp from 'sharp';

export class FileResizeHelper {
  async resizeFile(
    filename: string,
    width: number,
    height: number,
  ): Promise<void> {
    await sharp(`src/modules/upload/store/${filename}`)
      .resize(width, height)
      .webp()
      .toFile(`src/modules/upload/store/${filename}.webp`);
  }
}
