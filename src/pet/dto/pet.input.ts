import { InputType, Int, Field, ArrayElement } from '@nestjs/graphql';


@InputType()
export class CreateNewPetInput {
  @Field(() => String)
  category: string

  @Field(() => String)
  name: string

  @Field(() => [String])
  tags: string[]

  @Field(() => String)
  status: string
  
}

@InputType()
export class UpdatePetInput {
  @Field(() => String )
  id: string
  @Field(() => String, {nullable: true})
  category: string

  @Field(() => String, {nullable: true})
  name: string

  @Field(() => [String], {nullable: true})
  tags: string[]

  @Field(() => String, {nullable: true})
  status: string
  
}


@InputType()
export class DeletePetInput {
  @Field(() => String )
  id: string
}

@InputType()
export class FindPet {
  @Field(() => String, {nullable: true})
  id: string
  @Field(() => [String], {nullable: true})
  tags: string[]
  @Field(() => String, {nullable: true})
  status: string
}


@InputType()
export class FindPetWidthStatus {
  @Field(() => String)
  status: string
}
