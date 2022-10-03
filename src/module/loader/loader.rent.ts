import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { RentBook } from '../rent/entities/rent.entity';
import { RentService } from '../rent/rent.service';
import { sortDataByIds } from './loader.sort';

@Injectable()
export class RentLoader implements NestDataLoader<string, RentBook> {
  constructor(
    private readonly rentService: RentService  
  ) {}

  generateDataLoader(): DataLoader<string | null, RentBook> {
    return new DataLoader<string, RentBook>(async(keys?: string[]) =>
      await this.rentService.findByIds(keys).then((data) => {
        const property = 'user';
        return sortDataByIds(data, keys, property);
      }),
    );
  }
}