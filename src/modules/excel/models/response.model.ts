import { ObjectType  , Field } from "@nestjs/graphql";


ObjectType()
export class ExportResonpse {
    @Field()
    excelId : string 

    @Field()
    message : string 

    @Field( () => Boolean) 
    success : boolean
}