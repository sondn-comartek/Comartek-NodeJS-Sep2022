import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { AdminCreateBookInput, GetUserInput } from './dto/admin.input';
import { AdminCreateBookOutPut,UserOutPut } from './entities/admin.output';
import { UserLoader } from './admin.dataloader';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { Role } from 'src/enum/role.enum';
import { JWTAuthGuard } from 'src/modules/auth/auth.guard';
import { UseGuards } from '@nestjs/common'
import { Roles } from 'src/decorator/role.decorator';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(JWTAuthGuard)
  @Roles(Role.Admin)
  @Mutation(() => AdminCreateBookOutPut) 
  async createBook(@Args('createbook') args: AdminCreateBookInput) {
    const data = await this.adminService.AddBook(args)
    return {
      bookIds: data
    }
  }
  @Query( () => [UserOutPut]) 
  async getUser( @Args('userids') args: GetUserInput,
                @Loader(UserLoader) userLoader: DataLoader<string, UserOutPut>) {
  const users = await userLoader.loadMany(args.ids) as UserOutPut[]
  return users.map(user => {
    user.numberBorrow= user.borrowBook.length
    return user
  })
  }
}
