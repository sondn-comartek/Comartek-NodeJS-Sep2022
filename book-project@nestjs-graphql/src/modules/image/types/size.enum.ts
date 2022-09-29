import { registerEnumType } from "@nestjs/graphql";

export enum SizeImage {
    COVER_BOOK = 300 ,
    AVATAR = 100
}
registerEnumType(SizeImage , {
    name : "SizeImage"
})