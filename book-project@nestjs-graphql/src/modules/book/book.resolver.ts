import { UseGuards } from '@nestjs/common';
import { Resolver , Mutation , Query , Args } from '@nestjs/graphql';
import { Role } from '../auth/decorators';
import { JwtGuard, RoleGuard } from '../auth/guards';
import { UserRole } from '../user/types';
import { BookService } from './book.service';
import { CreateBookInput } from './dto';
import { GetListArg } from './dto/get-list.arg';
import { Book, ListBook } from './models';
import { BookStatus } from './types';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}
  @Mutation( () => Book )
  @Role( UserRole.ADMIN )
  @UseGuards( JwtGuard , RoleGuard)
  createBook( @Args('createBookInput') createBookInput: CreateBookInput ){
    return this.bookService.create(createBookInput) ;
  } 

  @Query( () => ListBook)
  async getListBook(@Args() getListArg:GetListArg ):Promise<ListBook>{
    const books = await this.bookService.findBooks(getListArg)
    return {
      books,
      count : books.length
    }
  }

}
