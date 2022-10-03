// import * as DataLoader from 'dataloader';
// import { Injectable } from '@nestjs/common';
// import { NestDataLoader } from 'nestjs-dataloader';
// import { sortDataByIds } from './loader.sort';
// import { UsersService } from '../users/users.service';
// import { User } from '../users/entities/user.entity';

// @Injectable()
// export class UserLoader implements NestDataLoader<string, User> {
//   constructor(
//     private readonly usersService: UsersService
//   ) {}

//   generateDataLoader(): DataLoader<string | null, User> {
//     return new DataLoader<string, User>((keys?: string[]) =>
//       this.usersService.validateUser(keys).then((data) => {
//         console.log(data);
//         return data;
//       }),
//     );
//   }
// }