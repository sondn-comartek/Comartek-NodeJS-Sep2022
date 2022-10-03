import { Field, InputType } from "@nestjs/graphql";

import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from "src/modules/fileupload/interface/fileupload.interface";

@InputType()
export class CreateBookInput {
    @Field()
    name: string
    @Field()
    categoryId: string
    @Field()
    quanities: number
    @Field()
    pages: number
    @Field(() => GraphQLUpload)
    img: Promise<FileUpload>;

}