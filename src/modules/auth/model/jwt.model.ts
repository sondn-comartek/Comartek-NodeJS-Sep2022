import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/model/user.model';

@ObjectType()
export class JWT {
    @Field()
    access_token: string
    @Field()
    user: User
}
