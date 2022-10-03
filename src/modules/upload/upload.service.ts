import { Injectable } from '@nestjs/common';
import { CreateUploadInput } from './dto/create-upload.input';
import { UpdateUploadInput } from './dto/update-upload.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { UploadImage, UploadImageDocument } from './entities/upload.entity';
import { Model } from 'mongoose';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(UploadImage.name)
    private readonly uploadModel: Model<UploadImageDocument>,
  ) {}

  async create(createUploadInput: CreateUploadInput) {
    try {
      const { image } = createUploadInput;

      const { createReadStream, filename } = await image;

      const imageExist = await this.uploadModel.findOne({ filename });
      if (imageExist) return new Error(`Image ${filename} already exists`);

      createReadStream()
        .pipe(
          createWriteStream(
            join(process.cwd(), `./src/stores/images/origin/${filename}`),
          ),
        )
        .on('finish', () => console.log('Upload succeeded'))
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });

      return await new this.uploadModel({
        ...createUploadInput,
        filename,
      }).save();
    } catch (e) {
      throw new Error(e);
    }
  }

  findAll() {
    return `This action returns all upload`;
  }

  async findOne(id: string) {
    return await this.uploadModel.findOne({ id });
  }

  update(id: number, updateUploadInput: UpdateUploadInput) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
