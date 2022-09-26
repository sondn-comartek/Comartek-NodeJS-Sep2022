import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UploadPetPhotoOutPut {



  @Field(() => Int)
  status: number

  @Field(() => String)
  message: string;
}
