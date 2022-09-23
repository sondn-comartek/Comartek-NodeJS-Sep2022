import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../shared/schemas/tag.schema';
import { Model } from 'mongoose';
import { CreateTagInput } from '../shared/inputs/create-tag.input';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private readonly tagSchema: Model<Tag>) { }

  async createTag(createTagInput: CreateTagInput) {
    const { name } = createTagInput;
    if (await this.getTagByName(name)) {
      throw new ConflictException(`Tag ${name} đã tồn tại`);
    }

    return await this.tagSchema.create(createTagInput);
  }

  async findAllTag(): Promise<Tag[]> {
    return await this.tagSchema.find({});
  }

  async getTagById(id: string): Promise<Tag> {
    return await this.tagSchema.findOne({ id });
  }

  async getTagByName(name: string): Promise<Tag> {
    return await this.tagSchema.findOne({ name });
  }

  async findTagByArrayId(ids: [string]): Promise<Tag[]> {
    return await this.tagSchema.find({ id: { $in: ids } })
  }
}
