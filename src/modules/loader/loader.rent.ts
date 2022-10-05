import { Book } from 'src/modules/book/schemas/book.schema';
import { Rent } from '../rent/schemas/rent.schema';
import { RentService } from '../rent/rent.service';
import { NestDataLoader } from 'nestjs-dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { sortDataByIds, sortDataByRefIds } from './loader.sort';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RentLoader implements NestDataLoader<string, Rent> {
  constructor(private readonly rentService: RentService) {}

  generateDataLoader(): DataLoader<string, Rent> {
    return new DataLoader<string, Rent>((keys: string[]) =>
      this.rentService
        .findByIds(keys)
        .then((data) => sortDataByIds(data, keys)),
    );
  }
}

@Injectable()
export class UserRentLoader implements NestDataLoader<string, Rent> {
  constructor(
    @InjectModel(Rent.name) private readonly rentModel: Model<Rent>,
  ) {}

  generateDataLoader(): DataLoader<string, Rent> {
    return new DataLoader<string, Rent>(async (userIds: string[]) => {
      const rents = await this.rentModel.find({
        userId: { $in: userIds },
      });

      return sortDataByRefIds({
        refIdFieldName: 'userId',
        refIds: userIds,
        entities: rents,
      });
    });
  }
}

@Injectable()
export class BookRentalCountLoader implements NestDataLoader<string, number> {
  constructor(private readonly rentService: RentService) {}

  generateDataLoader(): DataLoader<string, number> {
    return;
  }
}

@Injectable()
export class BookRentalInfoLoader implements NestDataLoader<string, Book> {
  constructor(private readonly rentService: RentService) {}

  generateDataLoader(): DataLoader<string, Book> {
    return;
  }
}
