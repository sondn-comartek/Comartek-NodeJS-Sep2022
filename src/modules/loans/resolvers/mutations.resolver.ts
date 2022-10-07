import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PubsubService } from 'src/modules/pubsub/pubsub.service';
import { Role } from 'src/modules/users/enums/role.enum';
import { CreateLoanInput } from '../dto/create-loan.input';
import { UpdateLoanInput } from '../dto/update-loan.input';
import { Loan } from '../entities/loan.entity';
import { LoansService } from '../services/loans.service';

@Resolver(() => Loan)
export class LoansMutation {
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

  @Mutation(() => Loan)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async updateLoan(@Args('updateLoanInput') updateLoanInput: UpdateLoanInput) {
    return await this.loansService.update(updateLoanInput.id, updateLoanInput);
  }

  @Mutation(() => Loan)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async removeLoan(@Args('id', { type: () => String }) id: string) {
    return await this.loansService.remove(id);
  }
}
