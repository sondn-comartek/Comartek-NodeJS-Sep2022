import { InputType, Int, Field } from '@nestjs/graphql';
import { Category } from 'src/modules/schema/category.schema';
import * as GrapqhUpload from 'graphql-upload/GraphQLUpload.js'
import { FileUpload } from 'src/modules/interface/FileUpload.interface';
@InputType()
export class AdminCreateBookInput {

  @Field(() => Int)
  number: number

  @Field(() => String )
  name: string

  @Field(() => [String])
  categorys: [string]

  @Field(() => Number, {nullable: true})
  episode?: number

  @Field(() => [GrapqhUpload], {nullable: true})
  images?: Promise<FileUpload>[]
}


@InputType()
export class GetUserInput {


  @Field(() => [String] )
  ids: string[]


}
