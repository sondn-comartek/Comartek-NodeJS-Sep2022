import { Injectable } from '@nestjs/common';
import { CreateUploadInput } from '../dto/create-upload.input';
import { UpdateUploadInput } from '../dto/update-upload.input';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { UploadImage, UploadImageDocument } from '../entities/upload.entity';
import { Model } from 'mongoose';
import * as dayjs from 'dayjs';

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

  async findAll() {
    return await this.uploadModel.find();
  }

  async findOne(id: string) {
    return await this.uploadModel.findOne({ id });
  }

  async update(id: string, updateUploadInput: UpdateUploadInput) {
    return await this.uploadModel.findOneAndUpdate(
      { id },
      { $set: { ...updateUploadInput, updatedAt: dayjs(new Date()).unix() } },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    const imageExist = await this.uploadModel.findOne({ id });
    if (!imageExist) {
      return null;
    }

    return await this.uploadModel.deleteOne({ id });
  }
}
