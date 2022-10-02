import { UpdateRentStatusInput } from './../inputs/update-rent-status.input';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Admin } from 'src/modules/auth/decorators/admin.decorator';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateRentInput } from '../inputs/create-rent.input';
import { RentService } from '../rent.service';
import { Rent } from '../schemas/rent.schema';

@Resolver(() => Rent)
export class RentMutationResolver {
  constructor(private readonly rentService: RentService) {}

  @Mutation(() => Rent)
  @UseGuards(JwtAuthGuard)
  async createRent(
    @User() user,
    @Args({ name: 'createRentInput', type: () => CreateRentInput })
    createRentInput: CreateRentInput,
  ): Promise<Rent> {
    return await this.rentService.create(user._id, createRentInput);
  }

  @Mutation(() => Rent)
  @UseGuards(JwtAuthGuard)
  async updateRentStatus(
    @Admin() admin,
    @Args({ name: 'updateRentStatusInput', type: () => UpdateRentStatusInput })
    updateRentStatusInput: UpdateRentStatusInput,
  ): Promise<Rent> {
    return await this.rentService.updateStatusById(updateRentStatusInput);
  }
}
