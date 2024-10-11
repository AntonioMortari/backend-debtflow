import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EntrieDocument = HydratedDocument<Entrie>

@Schema()
export class Entrie{

    @Prop({default: 'toPay'})
    status: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    date: Date

    @Prop()
    userId: string
}

const EntrieSchema = SchemaFactory.createForClass(Entrie);

export { EntrieSchema}