import { InputType, Field } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
class PetSearch {
  @IsInt()
  @Field({ name: 'petId', description: 'petId for searching pet', nullable: true })
  petId: number;

  @IsString()
  @Field({ name: 'tag', description: 'Tag for searching pet', nullable: true })
  tag: string;

  @IsString()
  @Field({ name: 'status', description: 'Status for searching pet', nullable: true })
  status: string;
}

@InputType()
export class SearchManagePetInput {
  @Field({ name: 'where', description: 'Filters for searching pet', nullable: false })
  where: PetSearch;
}
