// import * as DataLoader from 'dataloader';
// import { Injectable } from '@nestjs/common';
// import { NestDataLoader } from 'nestjs-dataloader';
// import { RentBook } from '../rent/entities/rent.entity';
// import { RentService } from '../rent/rent.service';
// import { sortDataByIds } from './loader.sort';

// @Injectable()
// export class CountRentLoader implements NestDataLoader<string, Number> {
//   constructor(
//     private readonly rentService: RentService  
//   ) {}

//   generateDataLoader(): DataLoader<string | null, Number> {
//     return new DataLoader<string, Number>(async(keys?: string[]) =>
//       await this.rentService.countRentByIds(keys).then((data) => {
//         return data;
//       }),
//     );
//   }
// }