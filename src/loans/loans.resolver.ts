import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { LoansService } from './loans.service';
import { Loan } from './entities/loan.entity';
import { CreateLoanInput } from './dto/create-loan.input';
import { UpdateLoanInput } from './dto/update-loan.input';
import { User } from 'src/users/entities/user.entity';
import { IDataloaders } from 'src/dataloader/dataloader.interface';
import { BookItem } from 'src/book-items/entities/book-item.entity';

@Resolver(() => Loan)
export class LoansResolver {
  constructor(private readonly loansService: LoansService) {}

  @Mutation(() => Loan)
  async createLoan(@Args('createLoanInput') createLoanInput: CreateLoanInput) {
    return await this.loansService.create(createLoanInput);
  }

  @Query(() => [Loan], { name: 'loans' })
  findAll() {
    return this.loansService.findAll();
  }

  @Query(() => Loan, { name: 'loan' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.loansService.findOne(id);
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

  @Mutation(() => Loan)
  updateLoan(@Args('updateLoanInput') updateLoanInput: UpdateLoanInput) {
    return this.loansService.update(updateLoanInput.id, updateLoanInput);
  }

  @Mutation(() => Loan)
  removeLoan(@Args('id', { type: () => Int }) id: number) {
    return this.loansService.remove(id);
  }
}
