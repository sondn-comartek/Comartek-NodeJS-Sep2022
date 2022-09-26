import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Photo {
    @Field()
    photo_url : string
    
    @Field({nullable : true})
    description : string 
}