import { UseGuards } from '@nestjs/common';
import { UserService } from './../user.service';
import { User } from '../schemas/user.schema';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';
import { Admin } from 'src/modules/auth/decorators/admin.decorator';
import { Loader } from 'nestjs-dataloader';
import { Rent } from 'src/modules/rent/schemas/rent.schema';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UserRentLoader } from 'src/modules/loader/loader.rent';
import DataLoader from 'dataloader';

@Resolver(() => User)
export class UserQueryResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async findAllUser(
    @Admin() admin,
    @Args({
      name: 'queryArgsInput',
      type: () => QueryArgsInput,
      nullable: true,
      defaultValue: { limit: 0, skip: 0 },
    })
    queryArgsInput: QueryArgsInput,
  ): Promise<User[]> {
    return await this.userService.findAll(queryArgsInput);
  }

  @ResolveField(() => Rent, { nullable: true })
  async rents(
    @Parent() user: User,
    @Loader(UserRentLoader) userRentLoader: DataLoader<string, Rent>,
  ): Promise<Rent | Error> {
    return await userRentLoader.load(user._id);
  }
}
