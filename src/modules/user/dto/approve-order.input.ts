
import { InputType , Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { OrderStatus } from "src/modules/order/types";

@InputType()
export class ApproveOrderInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    orderid : string 

    @Field( () => OrderStatus )
    @IsNotEmpty()
    @IsString()
    status : OrderStatus
}