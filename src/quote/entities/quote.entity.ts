import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type QuoteDocument = Quote & Document
@Schema()
export class Quote {
    @Prop({type:Object})
    origin: object
    @Prop({type:Object})
    destination
    @Prop({type:Object})
    package: object
    @Prop({type:Object})
    grossWeight: object
}
export const QuoteSchema = SchemaFactory.createForClass(Quote)