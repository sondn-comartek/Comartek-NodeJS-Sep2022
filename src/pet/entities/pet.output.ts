import { ObjectType, Int, Field, ArrayElement } from '@nestjs/graphql';



@ObjectType()
export class CreateNewPetOutPut {

  @Field(() => String)
  id: string
  @Field(() => String)
  category: string

  @Field(() => String)
  name: string

  @Field(() => [String])
  tags: string[]

  @Field(() => String)
  status: string
  
}

@ObjectType()
export class updatePetOutPut {

  @Field(() => String)
  id: string
  @Field(() => String)
  category: string

  @Field(() => String)
  name: string

  @Field(() => [String])
  tags: string[]

  @Field(() => String)
  status: string
  
}


@ObjectType()
export class DeletePetOutPut {


  @Field(() => Int)
  status: number

  @Field(() => String)
  message: string
  
}


@ObjectType()
export class PetOutPut {

  @Field(() => String)
  id: string
  @Field(() => String)
  category: string

  @Field(() => String)
  name: string

  @Field(() => [String])
  tags: string[]

  @Field(() => String)
  status: string
  
  @Field(() => [String])
  photoids: string[]
}