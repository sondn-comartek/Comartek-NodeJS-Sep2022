import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Image {
    @Field({ nullable : true })
    description : string 

    @Field()
    image_id : string

    @Field()
    image_url : string
}