import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/module/users/entities/user.entity';

@ObjectType()
export class SignInResponse {
    @Field(() => String, { name: 'access_token', description: 'Access token return when user login' })
    access_token: string;

    @Field(() => User, { name: 'user', nullable: false })
    user: User; 
}