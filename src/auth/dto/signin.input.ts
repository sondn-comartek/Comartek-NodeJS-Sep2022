import { InputType, Field } from "@nestjs/graphql";
import { Matches  } from "class-validator";
@InputType()
export class SignInInput {
  @Field(() => String)
  @Matches(/^[a-z0-9_-]{8,16}$/)
  username: string

  @Field(() => String) 
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  password: string


}