import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload, SizeImage } from "../types";

@InputType()
export class UploadImageInput {

    @Field({nullable : true})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description? : string

    @Field( () => GraphQLUpload)
    @IsNotEmpty()
    file : Promise<FileUpload>

    @Field( () => SizeImage )
    @IsNotEmpty()
    size : SizeImage
}