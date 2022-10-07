import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import * as GraphQLUpload  from "graphql-upload/GraphQLUpload.js";
import { FileUpload } from "../types";

@InputType()
export class UploadPhotoInput {
    @Field({ nullable : true})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description : string 
    
    @Field( () => GraphQLUpload )
    file : Promise<FileUpload>
 }