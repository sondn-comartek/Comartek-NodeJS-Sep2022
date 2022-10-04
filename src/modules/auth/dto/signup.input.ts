import { InputType, Field } from "@nestjs/graphql";
import { IsNumberString, Matches  } from "class-validator";
@InputType()
export class SignUpInput {
  @Field(() => String)
  @Matches(/^[a-z0-9_-]{8,16}$/)
  username: string

  @Field(() => String)
  firstname: string

  @Field(() => String)
  lastname: string


  @Field(() => String)
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email: string

  @Field(() => String) 
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  password: string
  
  @Field(() => String)
  @IsNumberString()
  phone: string
}