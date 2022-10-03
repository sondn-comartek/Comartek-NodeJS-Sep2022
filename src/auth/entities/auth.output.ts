import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SignUpOutput {
  @Field(() => Int, { description: 'Statuscode' })
  status: number;

  @Field(() => String, { description: 'Message' })
  message: string;
}

@ObjectType()
export class SignInOutput {
  @Field(() => Int, {description: "status"})
  status: number


  @Field(() => String, {description: "message"})
  message: string
  
  @Field(() => String, { description: 'jwt' })
  jwt: string;
  @Field(() => String)
  name: string;
}