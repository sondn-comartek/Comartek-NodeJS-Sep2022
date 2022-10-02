import { CreateMediaInput } from './inputs/create-media.input';
import { Media } from 'src/modules/media/schemas/media.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';

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

  async findAll(queryArgsInput?: QueryArgsInput): Promise<Media[]> {
    return await this.mediaSchema.find(
      {},
      {},
      {
        limit: queryArgsInput.limit,
        skip: queryArgsInput.skip,
      },
    );
  }
}
