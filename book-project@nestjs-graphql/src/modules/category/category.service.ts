import { BadRequestException, Injectable } from '@nestjs/common'
import { genCode } from 'src/ultils/gen-code.ultil'
import { CategoryRepository } from './category.repository'
import { CreateCategoryInput } from './dto'
import { CategoryDocument } from './models'
@Injectable()
export class CategoryService {
   constructor(
      private readonly categoryRepositoy: CategoryRepository,
   ) {}

   async findAllCategories(): Promise<CategoryDocument[]> {
      return await this.categoryRepositoy.FindAll({})
   }

   async findOneCategory(getCategoryArg): Promise<CategoryDocument> {
      const category = await this.categoryRepositoy.FindOne(getCategoryArg)
      if (!category)
         throw new BadRequestException(
            `Not found the category is '${getCategoryArg.code}'!`,
         )
      return category
   }

   async findCategoriesByCodes(codes: string[]): Promise<CategoryDocument[]> {
      return await this.categoryRepositoy.FindAll({
         code: {
            $in: codes,
         },
      })
   }

   async create(
      createCategoryInput: CreateCategoryInput,
   ): Promise<CategoryDocument> {
      return await this.categoryRepositoy.Create({
         code: genCode(createCategoryInput.name),
         ...createCategoryInput,
      })
   }
}
