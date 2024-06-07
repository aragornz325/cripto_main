import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoundStateDocument = RoundState & Document;

@Schema()
export class RoundState {
  @Prop()
  _id: number;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const RoundStateSchema = SchemaFactory.createForClass(RoundState);
