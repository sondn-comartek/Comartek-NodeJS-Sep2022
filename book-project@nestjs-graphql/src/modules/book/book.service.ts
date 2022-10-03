import { BadRequestException, Injectable } from '@nestjs/common'
import { genCode } from 'src/ultils'
import { v4 } from 'uuid'
import { CategoryService } from '../category/category.service'
import { BookRepository } from './book.repository'
import { CreateBookInput } from './dto'
import { GetListArg } from './dto/get-list.arg'
import { BookDocument } from './models'

@Injectable()
export class BookService {
   constructor(
      private readonly bookRepository: BookRepository,
      private readonly categoryService: CategoryService
   ) {}

   calculateTotalCountBooks(
      count_avaiable: number,
      count_unavaiable: number,
   ): number {
      return count_avaiable + count_unavaiable
   }

   async findBooksByCategoryCode(
      code: string,
      page: number | null,
   ): Promise<BookDocument[]> {
      let option: Record<string, unknown> | null = null
      if (page)
         option = {
            skip: 2 * (page - 1),
            limit: 2,
         }
      return await this.bookRepository.FindAll(
         {
            categories: code,
         },
         null,
         option,
      )
   }

   async findBooksByBookIds(ids: string[]): Promise<BookDocument[]> {
     console.log(`find >>> [${ids}]`)
      return await this.bookRepository.FindAll({ bookid: { $in: ids } }, null, {
         lean: true,
      })
   }

   async create(createBookInput: CreateBookInput): Promise<BookDocument> {
      const { title, part, categories } = createBookInput
      const listCategory = await this.categoryService.findCategoriesByCodes(categories)
      if (listCategory.length < categories.length)
         throw new BadRequestException('the category is undefined!')
      return await this.bookRepository.Create({
         bookid: v4(),
         code: genCode(`${title} ${part}`),
         ...createBookInput,
      })
   }

   async findBooks({ page }: GetListArg): Promise<BookDocument[]> {
      let option: Record<string, unknown> | null = null
      if (page)
         option = {
            skip: 2 * (page - 1),
            limit: 2,
         }
      return await this.bookRepository.FindAll({}, null, option)
   }
}
