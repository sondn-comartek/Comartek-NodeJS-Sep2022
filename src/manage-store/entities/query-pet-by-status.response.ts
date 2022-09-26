import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Prop } from "@nestjs/mongoose";
import { ManagePet } from "src/manage-pet/entities/manage-pet.entity";

@ObjectType()
class PetListRes {
    @Field(() => Int, { name: 'petId', description: 'petId of pet', nullable: false })
    @Prop({
        required: true
    })
    petId: number;

    @Field(() => String, { name: 'status', description: 'status of pet', nullable: false })
    @Prop({
        required: true
    })
    status: string;
}

@ObjectType()
export class GetQueryByStatusRes {
    @Field(() => [PetListRes], { name: 'petList', description: 'List of pets', nullable: false })
    @Prop({
        required: true
    })
    petList: [PetListRes];

    @Field(() => Int, { name: 'totalPet', description: 'Total of pet that have certain status', nullable: false })
    @Prop({
        required: true
    })
    totalPet: number
}