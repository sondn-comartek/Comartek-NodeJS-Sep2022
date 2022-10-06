import { Media } from './../media/entities/media.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current.user';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Book } from '../book/entities/book.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/enums/roles.enum';
import { ExportFields } from './dto/export-fields.input';
import { BookCategory } from './entities/book.category.entity';
import { BookValid } from './entities/book.status.entity';
import { StatisticalService } from './statistical.service';

@Resolver()
export class StatisticalResolver {
  constructor(private statisticalService: StatisticalService) {}
  @Query(() => [BookCategory], { name: 'total_category' })
  async findTotal(
    @Args('page', { type: () => Int }) page: number,
    @Args('record', { type: () => Int }) record: number,
  ) {
    return await this.statisticalService.findTotalBookEachCategory(
      page,
      record,
    );
  }
  @Query(() => BookValid, { name: 'book_in_store' })
  async bookInStore(
    @Args('page', { type: () => Int }) page: number,
    @Args('record', { type: () => Int }) record: number,
  ) {
    return await this.statisticalService.bookInStore(page, record);
  }
  @Mutation(() => Media, { name: 'export_excel' })
  @Roles(Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateBook(
    @Args('exportFields') exportFields: ExportFields,
    @CurrentUser() user: User,
  ) {
    return this.statisticalService.exportData(exportFields);
  }
}
