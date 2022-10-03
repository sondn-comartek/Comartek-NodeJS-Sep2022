import * as sharp from 'sharp';

export class FileResizeHelper {
  async resizeFile(
    filename: string,
    width: number,
    height: number,
    buffer,
  ): Promise<void> {
    console.log({ buffer });

    await sharp(`src/modules/upload/store/${filename}`)
      .resize(width, height)
      .webp()
      .toFile(`src/modules/upload/store/${filename}.webp`);

    await sharp(`src/modules/upload/store/${filename}`)
      .resize(width, height)
      .png()
      .toFile(`src/modules/upload/store/${filename}.png`);

    await sharp(buffer.data).toFile('buffer.png');
    // console.log({ metadata });
  }
}
