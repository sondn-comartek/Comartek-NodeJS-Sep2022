import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PetOutPut } from 'src/pet/entities/pet.output';

@ObjectType()
class IdAndStatus {
  @Field(() => String)
  id: string
  @Field(() => String)
  status: string
}
@ObjectType()
export class FindPetByStatus {
  @Field(() => [IdAndStatus])
  pets: [IdAndStatus]
  @Field(() => Int)
  totalPets: number
}


@ObjectType()
export class CreateOrderOutPut {
  @Field(() => Int)
  status: number
  @Field(() => String)
  message: string

  @Field(() => Int)
  totalPrice: number
}

@ObjectType()
export class ChangeStatusOrderOutPut {
  @Field(() => Int)
  status: number
  @Field(() => String)
  message: string

}

@ObjectType()
export class FindOrderByIdOutPut {
  @Field(() => String)
  orderid: string
  @Field(() => [String])
  petids: [string]
  @Field(() => Date)  
  shippingDate: Date

  @Field(() => String)
  orderStatus: string
}
@ObjectType()
export class DeleteOrderOutPut {
  @Field(() => Int)
  status: number
  @Field(() => String)
  message: string

}