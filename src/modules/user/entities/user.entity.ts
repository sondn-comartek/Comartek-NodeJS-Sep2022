import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps : true })
export class User extends Document {
    @Prop({isRequired: true}) 
    email : string
    @Prop({ isRequired: true})
    hash : string 
    @Prop({ default : 'customer' })
    role : string 
}

export const UserSchema = SchemaFactory.createForClass(User)  