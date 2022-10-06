import { Field, InputType } from "@nestjs/graphql";
import { DataFieldEnum } from "../enums/data-field.input";

@InputType()
export class CreateExtractDataInput {
    @Field(() => DataFieldEnum)
    readonly dataField: DataFieldEnum
}