import { Rent } from '../rent/schemas/rent.schema';
import { RentService } from '../rent/rent.service';
import { NestDataLoader } from 'nestjs-dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { sortDataByRefIds } from './loader.sort';

@Injectable()
export class RentLoader implements NestDataLoader<string, Rent> {
  constructor(private readonly rentService: RentService) {}

  generateDataLoader(): DataLoader<string, Rent> {
    return new DataLoader<string, Rent>((keys: string[]) =>
      this.rentService.findByIds(keys),
    );
  }
}

@Injectable()
export class UserRentLoader implements NestDataLoader<string, Rent> {
  constructor(private readonly rentService: RentService) {}

  generateDataLoader(): DataLoader<string, Rent> {
    return new DataLoader<string, Rent>(async (userIds: string[]) => {
      const rents = await this.rentService.findByCondition({
        userId: { $in: userIds },
      });

      const sortedData = sortDataByRefIds({
        refIdFieldName: 'userId',
        refIds: userIds,
        entities: rents,
      });

      console.log({ rents, sortedData });

      return sortedData;
    });
  }
}
