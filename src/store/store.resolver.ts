import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateBorrowInput } from 'src/customer/dto/update-borrow.input';
import { StoreService } from './store.service';

@Resolver(() => String)
export class StoreResolver {
  constructor(private storeService: StoreService) {}
  @Query(() => String)
  getAmountBookBorrow(@Args('ids', { type: () => [String] }) ids: string[]) {
    return "amount book of user's borrow";
  }
  @Mutation(() => String)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateBorrowStatus(
    @Args('updateBorrowStatus') updateBorrowInput: UpdateBorrowInput,
  ) {
    return this.storeService.updateBorrowStatus(
      updateBorrowInput.borrowId,
      updateBorrowInput.status,
    );
  }
}
