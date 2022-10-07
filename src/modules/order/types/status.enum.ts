import { registerEnumType } from "@nestjs/graphql"

export enum OrderStatus {
    ACCEPCTED = "accepted" ,
    PENDING = "pending" ,
    REJECTED = "rejected" ,
    COMPLETED = "completed"
}

registerEnumType( 
    OrderStatus ,
    {
        name : 'OrderStatus'
    }
)