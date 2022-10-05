import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, Timeout } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Media } from '../media/schemas/media.schema';
import * as fs from 'fs';

const ORIGIN_STORE_PATH = 'store/origin/';

@Injectable()
export class MediaCron {
  constructor(
    @InjectModel(Media.name) private readonly mediaModel: Model<Media>,
  ) {}

  // Xóa những media documents sinh ra trong quá trình upload file không thành công
  @Cron('@weekly')
  async deleteNotUsedMedia() {
    const medias: Media[] = await this.mediaModel.find({});
    const mediaIds: string[] = medias.map((media) => media._id.toString());
    const originFilenames: string[] = fs.readdirSync(ORIGIN_STORE_PATH);
    const existedMediaIdsOnDatabase = originFilenames.map(
      (filename) => filename.split('.')[0],
    );

    await this.mediaModel.deleteMany({
      _id: { $nin: existedMediaIdsOnDatabase },
    });

    console.log('========== Delete not used media documents ==========');
  }
}
