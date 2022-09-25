import { registerEnumType } from "@nestjs/graphql";

export enum OrderStatus {
    PLACED = "placed" ,
    APPROVED = "approved" ,
    DELIVERED = "delivered"
}
registerEnumType(OrderStatus , {
    name : 'OrderStatus'
})

//      * placed: order is created
//     * approved: order is approved by the store & received payments
//     * delivered: order is successfully shipped to the buyer