import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { AdminCreateBookInput, GetUserInput } from './dto/admin.input';
import { AdminCreateBookOutPut,UserOutPut } from './entities/admin.output';
import { CreateAdminInput } from './dto/create-admin.input';
import { User } from 'src/schema/user.schema';
import { UserLoader } from './admin.dataloader';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { SignInOutput } from 'src/auth/entities/auth.output';
import { Book } from 'src/schema/book.schema';
@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService,
              ) 
              {}
  @Mutation(() => AdminCreateBookOutPut) 
  async createBook(@Args('createbook') args: AdminCreateBookInput) {
    await this.adminService.AddBook(args)
   
    return {
      bookIds: ["313213"]
    }
  }

  @Query( () => [UserOutPut]) 
  async getUser( @Args('userids') args: GetUserInput,
                @Loader(UserLoader) userLoader: DataLoader<string, UserOutPut>) {
    
   
    return await userLoader.loadMany(args.ids) ;

    

  }
 
}
