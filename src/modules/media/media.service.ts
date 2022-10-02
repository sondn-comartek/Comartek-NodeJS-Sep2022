import { CreateMediaInput } from './inputs/create-media.input';
import { Media } from 'src/modules/media/schemas/media.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private readonly mediaSchema: Model<Media>,
  ) {}

  async findById(id: string): Promise<Media> {
    return await this.mediaSchema.findById(id);
  }

  async findByIds(ids: string[]): Promise<Media[]> {
    return await this.mediaSchema.find({ _id: { $in: ids } });
  }

  async create(createMediaInput: CreateMediaInput): Promise<Media> {
    return await this.mediaSchema.create(createMediaInput);
  }
}
