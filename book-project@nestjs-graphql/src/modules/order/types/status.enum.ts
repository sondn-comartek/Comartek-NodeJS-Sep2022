import { registerEnumType } from "@nestjs/graphql"

export enum OrderStatus {
    ACCEPCTED = "accepted" ,
    PENDING = "pending" ,
    REJECTED ="rejected"
}

registerEnumType( 
    OrderStatus ,
    {
        name : 'OrderStatus'
    }
)