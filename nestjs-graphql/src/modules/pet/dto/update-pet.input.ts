import { ArgsType, PartialType  , OmitType, InputType, Field, extend} from "@nestjs/graphql";
import { IsNotEmpty, IsUUID } from "class-validator";
import { CreatePetInput } from "./create-pet.input";


@InputType()
export class UpdatePetInput extends PartialType(CreatePetInput) {
    @Field()
    @IsNotEmpty()
    @IsUUID()
    petid : string
}