import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { join } from 'path';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Image } from './entities/image.entity';
import { createWriteStream } from 'fs';
import * as dayjs from 'dayjs';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Image') private readonly image: Model<Image>,
    @InjectQueue('uploadImage') private uploadImageQueue: Queue
  ) { }

  async create(createImageInput: CreateImageInput): Promise<String> {
    const { image, width, height } = createImageInput;
    const { createReadStream, filename } = await image;

    const imageWriteStream = createReadStream().pipe(
      createWriteStream(join(process.cwd(), `./public/images/${filename}`)))
      .on('finish', async () => {
        await this.uploadImageQueue.add('uploadImage', {
          imagePath: imageWriteStream.path,
          size: {
            width: width,
            height: height
          }
        })
      })
      .on('error', () => {
        new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
      });

    const originalImageFilePath = join(process.cwd(), `./public/images/${filename}`);
    const regex = /.png|.jpg|.jpeg/g;
    let webpFilename = filename.replace(regex, '.webp');
    const thumbnailImageFilePath = join(process.cwd(), `./public/images/${webpFilename}`);

    const newImage = {
      imageId: uuidv4(),
      originalFilePath: originalImageFilePath,
      thumbnailFilePath: thumbnailImageFilePath,
      createdAt: dayjs().unix(),
      updatedAt: dayjs().unix()
    }

    const createdImage = await this.image.create(newImage);
    if (!createdImage) {
      throw new HttpException('Error in creating a new image', HttpStatus.BAD_REQUEST);
    }
    return createdImage.imageId;
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageInput: UpdateImageInput) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
