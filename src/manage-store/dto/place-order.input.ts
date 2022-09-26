import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsDateString } from 'class-validator';

@InputType()
export class PlaceOrderInput {
    @IsArray()
    @Field(() => [Int], { name: 'petIdList', description: 'The array of petId for the order', nullable: false })
    petIdList: [number];

    @IsDateString()
    @Field(() => String, { name: 'expectedDate', description: 'The expected shipping date for the order', nullable: true })
    expectedDate: string;
}
