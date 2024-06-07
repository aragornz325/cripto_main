import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BetAction } from './bet-action.schema';

export type BetStateDocument = BetState & Document;

@Schema()
export class BetState {
  @Prop()
  _id: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [mongoose.Schema.Types.Number], ref: 'BetAction' })
  betActions: number[];
}

export const BetStateSchema = SchemaFactory.createForClass(BetState);
