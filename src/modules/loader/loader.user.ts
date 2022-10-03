import { sortDataByIds } from './loader.sort';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class UserLoader implements NestDataLoader<string, User> {
  constructor(private readonly userService: UserService) {}

  generateDataLoader(): DataLoader<string, User> {
    return new DataLoader<string, User>((keys: string[]) =>
      this.userService
        .findByIds(keys)
        .then((data) => sortDataByIds(data, keys)),
    );
  }
}
