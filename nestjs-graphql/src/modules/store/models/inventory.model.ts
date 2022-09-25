import { Field, ID, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { Pet } from "src/modules/pet/models";

@ObjectType()
export class PetItem extends PickType(Pet , ['petid' , 'status']) {}

@ObjectType()
export class Inventory {
    @Field( () => [PetItem])
    pets : PetItem[]

    @Field( ()=> Int) 
    count : number 
}