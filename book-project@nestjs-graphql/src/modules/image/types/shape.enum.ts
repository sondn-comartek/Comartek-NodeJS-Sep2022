import { registerEnumType } from "@nestjs/graphql";

export enum ShapeImage {
    COVER_BOOK = 300 ,
    AVATAR = 100
}
registerEnumType(ShapeImage , {
    name : "ShapeImage"
})