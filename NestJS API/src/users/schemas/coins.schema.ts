import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CoinsDocument = Coins & Document;
@Schema()
export class Coins {
  @Prop()
  one: number;
  @Prop()
  five: number;
  @Prop()
  ten: number;
  @Prop()
  twentyfive: number;
  @Prop()
  fifty: number;
  @Prop()
  hundred: number;
  @Prop()
  twohundred: number;
  @Prop()
  fivehundred: number;
  @Prop()
  thousand: number;
}

export const CoinsSchema = SchemaFactory.createForClass(Coins);
