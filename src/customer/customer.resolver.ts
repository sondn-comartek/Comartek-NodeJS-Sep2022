import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Borrower } from './entities/borrower.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CreateBorrowInput } from './dto/create-borrow.input';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';

@Resolver()
export class CustomerResolver {
  constructor(private customerService: CustomerService) {}
  @Mutation(() => Borrower)
  @Roles(Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createBorrow(
    @Args('createBorrowInput') createBorrowInput: CreateBorrowInput,
  ) {
    return await this.customerService.createBorrow(createBorrowInput);
  }
}
