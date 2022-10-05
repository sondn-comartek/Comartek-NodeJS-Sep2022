import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MediaCron } from './cron.media';
import { Media, MediaSchema } from '../media/schemas/media.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Media.name,
        schema: MediaSchema,
      },
    ]),
  ],
  providers: [MediaCron],
})
export class CronModule {}
