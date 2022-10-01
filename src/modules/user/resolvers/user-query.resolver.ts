import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserService } from './../user.service';
import { User } from '../schemas/user.schema';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';
import { Admin } from 'src/modules/auth/decorators/admin.decorator';

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
}
