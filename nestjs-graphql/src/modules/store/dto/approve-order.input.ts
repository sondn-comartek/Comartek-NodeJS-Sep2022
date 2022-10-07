import { Field, ID, InputType, OmitType } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsString , IsUUID } from "class-validator";
import { OrderStatus } from "../types";

@InputType()
export class ApproveOrderInput  {
    @Field( () => ID)
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    orderid : string 

    @Field( () => OrderStatus )
    @IsNotEmpty()
    @IsString()
    @IsIn([OrderStatus.APPROVED , OrderStatus.DELIVERED , OrderStatus.PLACED ])
    status : string 
}