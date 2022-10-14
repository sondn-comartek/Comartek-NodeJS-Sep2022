import * as sharp from 'sharp';

export const processUploadImage = async (imageData: any) => {
    const { imagePath, size } = imageData;
    // const regex = /.png|.jpg|.jpeg/g;
    // filename = filename.replace(regex, '.webp');
    const newImagePath = imagePath.split('.')[0] + '.webp';
    const { width, height } = size;
    sharp(imagePath)
        .resize(width, height, {
            fit: 'contain'
        })
        .toFile(newImagePath)
        .catch(err => { throw new Error(err); });
} 