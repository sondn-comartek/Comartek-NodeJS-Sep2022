
import { Document  } from "mongoose";
import { Schema , Prop , SchemaFactory } from "@nestjs/mongoose";

export type MigrationDocument = Migration  & Document

@Schema()
export class Migration extends Document {
    @Prop({
        unique : true
    })
    key: String

    @Prop()
    createdAt: Date
}

export const MigrationSchema = SchemaFactory.createForClass(Migration)
