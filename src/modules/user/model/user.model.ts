import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Types, ObjectId } from 'mongoose';
import { Book } from 'src/modules/book/model/book.model';
@Schema()
@ObjectType()
export class User {
    @Field()
    id: string
    @Field()
    @Prop()
    username: string
    @Field()
    @Prop()
    gmail: string
    @Field()
    @Prop()
    password: string
    @Field()
    @Prop({ default: 'user' })
    role: string
    @Field(() => [Book])
    @Prop({
        type: [Types.ObjectId],
        ref: Book.name
    })
    ListBooksBorrow: [Types.ObjectId]

}
const UserSchema = SchemaFactory.createForClass(User)
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

export { UserSchema }