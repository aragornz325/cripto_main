import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BetActionDocument = BetAction & Document;

@Schema()
export class BetAction {
  @Prop()
  _id: number;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const BetActionSchema = SchemaFactory.createForClass(BetAction);
