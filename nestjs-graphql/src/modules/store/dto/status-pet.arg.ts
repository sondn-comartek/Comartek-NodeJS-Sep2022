import { ArgsType, Field } from "@nestjs/graphql";
import { IsIn, IsNotEmpty } from "class-validator";
import { PetStatus } from "src/modules/pet/types";
@ArgsType()
export class StatusPetArg {
    @Field( () => PetStatus )
    @IsNotEmpty()
    @IsIn( [PetStatus.AVAIABLE , PetStatus.UNAVAIABLE])
    status : string
}