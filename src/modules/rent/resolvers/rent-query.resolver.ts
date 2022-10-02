import { Rent } from './../schemas/rent.schema';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RentService } from '../rent.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Admin } from 'src/modules/auth/decorators/admin.decorator';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Rent)
export class RentQueryResolver {
  constructor(private readonly rentService: RentService) {}

  @Query(() => [Rent])
  @UseGuards(JwtAuthGuard)
  async findAllRent(
    @Admin() admin,
    @Args({
      name: 'queryArgsInput',
      type: () => QueryArgsInput,
      nullable: true,
      defaultValue: { limit: 0, skip: 0 },
    })
    queryArgsInput: QueryArgsInput,
  ): Promise<Rent[]> {
    return await this.rentService.findAll(queryArgsInput);
  }
}
