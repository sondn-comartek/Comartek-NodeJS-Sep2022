import { Media } from './../media/entities/media.entity';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
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
import { Notification } from '../notification/entities/notification.entity';
import { NotificationService } from '../notification/notification.service';
import * as _ from 'lodash';
@Resolver()
export class StatisticalResolver {
  constructor(
    private statisticalService: StatisticalService,
    private notificationService: NotificationService,
  ) {}
  @Subscription(() => Notification, {
    resolve: (data) => data,
    filter: (payload, variables) => {
      const recipients = payload.recipients;
      const userID = variables?.userID;
      const recipientsConverter = _.map(recipients, (item) => {
        return String(item);
      });
      console.log([recipientsConverter, userID]);
      const isMatch = _.includes(recipientsConverter, userID);
      console.log(isMatch);
      return isMatch;
    },
  })
  @UseGuards(JwtAuthGuard)
  async notificationExport(@Args('userID') userID: string) {
    return await this.notificationService.listen('notification_export');
  }

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
    return this.statisticalService.exportData(exportFields, user);
  }
}
