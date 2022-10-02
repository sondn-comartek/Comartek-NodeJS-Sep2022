import { CategoryService } from './../category/category.service';
import { Injectable } from '@nestjs/common';
import { BookService } from '../book/book.service';
import * as _ from 'lodash';
import { Args } from '@nestjs/graphql';
@Injectable()
export class StatisticalService {
  constructor(
    private categoryService: CategoryService,
    private bookService: BookService,
  ) {}
  async findTotalBookEachCategory(page: number, record: number): Promise<any> {
    const categories = await this.categoryService.findAll();
    const amountEachCategory = await this.bookService.findGroupBookByCategory(
      page,
      record,
    );
    let result = [];
    _.forEach(amountEachCategory, (o) => {
      const { category, status } = o?._id;
      const amount = o?.count;
      const isCategoryValid = _.find(categories, ['id', category]);
      let data = {
        categoryID: isCategoryValid?._id,
        name: isCategoryValid?.name,
        photo_id: isCategoryValid?.photo_id,
        total: amount,
        status: status,
      };
      result.push(data);
    });
    return result;
  }
}
