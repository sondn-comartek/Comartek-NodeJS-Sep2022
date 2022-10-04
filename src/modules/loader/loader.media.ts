import { NestDataLoader } from 'nestjs-dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { sortDataByIds } from './loader.sort';
import { Media } from '../media/schemas/media.schema';
import { MediaService } from '../media/media.service';

@Injectable()
export class MediaLoader implements NestDataLoader<string, Media> {
  constructor(private readonly mediaService: MediaService) {}

  generateDataLoader(): DataLoader<string, Media> {
    return new DataLoader<string, Media>((keys: string[]) =>
      this.mediaService.findByIds(keys).then((data) => {
        return sortDataByIds(data, keys);
      }),
    );
  }
}

