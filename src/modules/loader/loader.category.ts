import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'nestjs-dataloader';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/schemas/category.schema';
import { sortDataByIds } from './loader.sort';

@Injectable()
export class CategoryLoader implements NestDataLoader<string, Category> {
  constructor(private readonly categoryService: CategoryService) {}

  generateDataLoader(): DataLoader<string, Category> {
    return new DataLoader<string, Category>((keys: string[]) =>
      this.categoryService
        .findByIds(keys)
        .then((data) => sortDataByIds(data, keys)),
    );
  }
}
