import { registerEnumType } from "@nestjs/graphql";

export enum BookStatus {
    AVAIABLE = "avaiable" ,
    UNAVAIABLE = "unavaiable",
    PENDING = "pending"
}

registerEnumType( 
    BookStatus ,
    {
        name : 'BookStatus'
    }
)