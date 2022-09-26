import { Field, InputType, Int } from "@nestjs/graphql";
import { FileUpload } from "../interfaces/upload-image.interface";
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { IsNumber } from "class-validator";

@InputType()
export class UploadPetImageInput {
    @IsNumber()
    @Field(() => Int, { name: 'petId', description: 'ID of the pet', nullable: false })
    petId: number;

    @Field(() => GraphQLUpload, { name: 'image', description: 'Image of pet', nullable: false })
    image: Promise<FileUpload>
}