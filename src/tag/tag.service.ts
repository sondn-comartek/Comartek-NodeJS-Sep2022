import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../shared/schemas/tag.schema';
import { Model } from 'mongoose';
import { CreateTagInput } from '../shared/inputs/create-tag.input';
import { TagResponseType } from '../shared/types/tag-response.type';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private readonly tagSchema: Model<Tag>) {}

  async createTag(createTagInput: CreateTagInput): Promise<TagResponseType> {
    const { name } = createTagInput;
    if (await this.getTagByName(name)) {
      throw new ConflictException(`Tag ${name} đã tồn tại`);
    }

    const tag = await this.tagSchema.create(createTagInput);

    return new TagResponseType(tag._id.toString(), tag.name);
  }

  async findAllTag(): Promise<TagResponseType[]> {
    const tags = await this.tagSchema.find({});
    const tagsResponse: TagResponseType[] = [];

    tags.forEach((tag) => {
      const tagResponse = new TagResponseType(tag._id.toString(), tag.name);
      tagsResponse.push(tagResponse);
    });

    return tagsResponse;
  }

  async getTagById(id: string): Promise<Tag> {
    return await this.tagSchema.findOne({ _id: id });
  }

  async getTagByName(name: string): Promise<Tag> {
    return await this.tagSchema.findOne({ name });
  }

  async findTagByArrayId(ids: string[]): Promise<Tag[]> {
    return await this.tagSchema.find({ _id: { $in: ids } });
  }
}
