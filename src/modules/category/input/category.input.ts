import { Field, InputType } from "@nestjs/graphql";
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from "src/modules/fileupload/interface/fileupload.interface";


@InputType()
export class CreateCategoryInput {
    @Field(() => String)
    name: string;
    @Field(() => GraphQLUpload)
    img: Promise<FileUpload>;
}