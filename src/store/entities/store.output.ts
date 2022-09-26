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
export class StatusAndMessage {
  @Field(() => Int)
  status: number
  @Field(() => String)
  message: string
}