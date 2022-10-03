import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload, ShapeImage } from "../types";

@InputType()
export class UploadImageInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    description : string

    @Field( () => GraphQLUpload)
    @IsNotEmpty()
    file : Promise<FileUpload>

    @Field( () => ShapeImage )
    @IsNotEmpty()
    shape : ShapeImage
}