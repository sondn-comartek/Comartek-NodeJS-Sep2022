import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common'
import { JWTAuthGuard } from 'src/modules/auth/auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { BorrowBookOutput } from './entities/user.output';
import { BorrowBookInput } from './dto/user.input';
import { User } from 'src/decorator/user.decorator';
import { UserEntity } from './model/user.entity';

@Resolver( () => UserEntity )
export class UserResolver {
  constructor(private readonly userService: UserService,) {} 
    @UseGuards(JWTAuthGuard)
    @Roles(Role.User)
    @Mutation(() => BorrowBookOutput) 
    async borrowBook(@User() user, @Args('borrowbook') input: BorrowBookInput) {
      await this.userService.borrowBook(user.id, input.bookid);
      return{
        status: 200,
        message: "require borrow book be send"
      }
    }
  

}
