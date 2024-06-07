import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';
import { PokerRoom } from './poker-room.schema';
import { PokerRound } from './poker-round.schema';
import { BetState } from './bet-state.schema';

export type PokerPlayerDocument = PokerPlayer & Document;

@Schema()
export class PokerPlayer {
  @Prop({ default: null })
  seat: number;

  @Prop({ default: 0 })
  currentBet: number;

  @Prop()
  roomBalance: number;

  @Prop({ default: false })
  didAnAction: boolean;

  @Prop()
  hand: any[];

  @Prop()
  solvedHand: string;

  @Prop()
  solvedHandArray: string[];

  @Prop()
  nameHand: string;

  @Prop()
  descrHand: string;

  @Prop()
  rankHand: number;

  @Prop({ type: mongoose.Schema.Types.Number, ref: 'BetState' })
  betState: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PokerRoom' })
  room: PokerRoom;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PokerRound' })
  rounds: PokerRound[];
}

export const PokerPlayerSchema = SchemaFactory.createForClass(PokerPlayer);
