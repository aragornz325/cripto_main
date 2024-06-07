import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomStateDocument = RoomState & Document;

@Schema()
export class RoomState {
  @Prop()
  _id: number;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const RoomStateSchema = SchemaFactory.createForClass(RoomState);
