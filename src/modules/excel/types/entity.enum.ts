import { registerEnumType } from "@nestjs/graphql";



export enum Entity {
    USER = 'user' ,
    BOOK = 'book' ,
    ORDER = 'order' ,
    CATEGORY = 'category' ,
    IMAGE = 'image' , 
    EXCEL = 'excel'
}

registerEnumType( Entity , {
    name : 'entity' 
 })