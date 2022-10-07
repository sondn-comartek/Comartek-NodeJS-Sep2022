import { Field, InputType,OmitType , PartialType } from "@nestjs/graphql";
import { RegiserInput } from "src/modules/auth/dto";

@InputType()
export class UpdateUserInput extends PartialType(
    OmitType(RegiserInput , ['password'])
) {}