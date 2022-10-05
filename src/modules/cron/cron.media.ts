import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Media } from '../media/schemas/media.schema';

const ORIGIN_STORE_PATH = 'store/origin/';
const WEBP_STORE_PATH = 'store/webp/';
const RESIZE_STORE_PATH = 'store/resize/';

@Injectable()
export class MediaCron {
  constructor(
    @InjectModel(Media.name) private readonly mediaModel: Model<Media>,
  ) {}

  @Cron('@weekly')
  async deleteNotUsedMedia() {
    const medias: Media[] = await this.mediaModel.find({});
    const mediaIds: string[] = medias.map((media) => media._id);
  }
}
