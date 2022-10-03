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

// @Injectable()
// export class MediaBookLoader implements NestDataLoader<string, Media> {
//   constructor(private readonly mediaService: MediaService) {}

//   generateDataLoader(): DataLoader<string, Media> {
//     return new DataLoader<string, Media>(async (categoryIds: string[]) => {
//       const medias = await this.mediaService.findByCondition({
//         bookId: { $in: categoryIds },
//       });

//       return sortDataByRefIds({
//         refIdFieldName: 'categoryId',
//         refIds: categoryIds,
//         entities: books,
//       });
//     });
//   }
// }
