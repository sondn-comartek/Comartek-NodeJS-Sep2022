import * as sharp from 'sharp';
export const categoryResize = async (path, width = 128) => {
  const date = new Date();
  const pathFile = `${
    process.env.PATH_IMAGE_SAVE_CATEGORY
  }${date.getTime()}.webp`;
  await sharp(path).resize({ width: width }).toFormat('webp').toFile(pathFile);
  return pathFile;
};
