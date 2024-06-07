import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Coins } from './coins.schema';
import { PokerPlayer } from 'src/poker-holdem/schemas/poker-player.schema';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  phone: string;
  @Prop()
  date: Date;
  @Prop()
  status: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Coins' })
  coins: Coins;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'PokerPlayer' })
  pokerPlayers: PokerPlayer[];

  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
