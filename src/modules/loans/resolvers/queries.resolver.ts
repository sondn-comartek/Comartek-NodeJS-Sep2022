import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { BookItem } from 'src/modules/book-items/entities/book-item.entity';
import { IDataloaders } from 'src/modules/dataloader/dataloader.interface';
import { User } from 'src/modules/users/entities/user.entity';
import { Loan } from '../entities/loan.entity';
import { LoansService } from '../services/loans.service';

@Resolver(() => Loan)
export class LoansQuery {
  constructor(private readonly loansService: LoansService) {}

  @Query(() => [Loan], { name: 'loans' })
  async findAll() {
    return await this.loansService.findAll();
  }

  @Query(() => Loan, { name: 'loan' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.loansService.findOne(id);
  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(
    @Parent() loan: Loan,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    return await loaders.usersLoader.load(loan.userId);
  }

  @ResolveField(() => BookItem, { name: 'bookItem' })
  async getBookItem(
    @Parent() loan: Loan,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    return await loaders.bookItemsLoader.load(loan.bookItemId);
  }
}
