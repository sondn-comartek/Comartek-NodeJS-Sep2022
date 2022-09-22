import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../shared/schemas/tag.schema';
import { Model } from 'mongoose';
import { CreateTagInput } from '../shared/inputs/create-tag.input';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private readonly tagSchema: Model<Tag>) {}

  async createTag(createTagInput: CreateTagInput) {}

  async getTagById(id: string) {}

  async getTagByName(name: string) {}

  async updateTagById(id: string, updateTagInput: CreateTagInput) {}

  async deleteTagById(id: string) {}
}
