import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagResponseType {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  constructor(_id: string, name: string) {
    this._id = _id;
    this.name = name;
  }
}
