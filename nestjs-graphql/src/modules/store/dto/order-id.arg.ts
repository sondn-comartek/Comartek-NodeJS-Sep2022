import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@ArgsType()
export class OrderIdArg {
    @Field( () => ID)
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    orderid : string
}