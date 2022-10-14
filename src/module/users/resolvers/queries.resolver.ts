import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { RentBook } from '../../rent/entities/rent.entity';
import { RentLoader } from '../../loader/loader.rent';
import { RentService } from 'src/module/rent/rent.service';
import { Roles } from 'src/module/auth/decorators/roles.decorator';
import { Role } from 'src/module/auth/enums/role.enum';
import { RolesGuard } from 'src/module/auth/guards/roles.guard';

@Resolver(() => User)
export class UserQueryResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly rentService: RentService
  ) { }

  @Query(() => User, { name: 'user' })
  findOne(@Args('email', { type: () => String }) email: string) {
    return this.usersService.findByEmail(email);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getAllUser() {
    return this.usersService.findAllUser();
  }

  @ResolveField(() => [RentBook], { name: 'borrowed' })
  async getUserBookRent(
    @Parent() user: User,
    @Loader(RentLoader) rentLoader: DataLoader<User['_id'], RentBook>
  ): Promise<RentBook | Error> {
    return await rentLoader.load(user._id);
  }

  @ResolveField(() => Number, { name: 'totalBorrowed' })
  async getTotalUserBookRent(
    @Parent() user: User
  ): Promise<Number | Error> {
    return this.rentService.countRentById(user._id);
  }
}
