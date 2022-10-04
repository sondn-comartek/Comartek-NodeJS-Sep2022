import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from '../book.service';
import { Book, BorrowBookOutput } from '../entities/book.entity';
import { JWTAuthGuard } from 'src/modules/auth/auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { User } from 'src/decorator/user.decorator';
import { UseGuards } from '@nestjs/common'
import { BorrowBookInput } from '../dto/user.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService,
              ) {}

  @UseGuards(JWTAuthGuard)
  @Roles(Role.User)
  @Mutation(() => BorrowBookOutput) 
  async borrowBook(@User() user, @Args('borrowbook') input: BorrowBookInput) {
    await this.bookService.borrowBook(user.id, input.bookid);
    return{
      status: 200,
      message: "require borrow book be send"
    }
  }
}
