import { registerEnumType } from "@nestjs/graphql";

export enum PetStatus {
    AVAIABLE = "avaiable" ,
    UNAVAIABLE = "unavaiable"
}

registerEnumType(PetStatus , {
    name : "PetStatus"
})