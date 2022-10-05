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
import { User } from '../users/entities/user.entity';
import { IDataloaders } from '../dataloader/dataloader.interface';
import { BookItem } from '../book-items/entities/book-item.entity';
import { PubsubService } from '../pubsub/pubsub.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Resolver(() => Loan)
export class LoansResolver {
  constructor(
    private readonly loansService: LoansService,
    private readonly pubsubService: PubsubService,
  ) {}

  @Mutation(() => Loan)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Customer)
  async createLoan(@Args('createLoanInput') createLoanInput: CreateLoanInput) {
    await this.pubsubService.publishEvent('requestBorrow', {
      requestBorrow: 'I want to borrow this book',
    });
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
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  updateLoan(@Args('updateLoanInput') updateLoanInput: UpdateLoanInput) {
    return this.loansService.update(updateLoanInput.id, updateLoanInput);
  }

  @Mutation(() => Loan)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  removeLoan(@Args('id', { type: () => Int }) id: number) {
    return this.loansService.remove(id);
  }
}
