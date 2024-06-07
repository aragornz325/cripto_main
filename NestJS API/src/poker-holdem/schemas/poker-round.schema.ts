import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { PokerPlayer, PokerPlayerDocument } from './poker-player.schema';
import { PokerRoom } from './poker-room.schema';

export type PokerRoundDocument = PokerRound & Document;

@Schema()
export class PokerRound {
  @Prop()
  deck: any[];

  @Prop()
  tableCards: any[];

  @Prop({ default: 0 })
  pot: number;

  @Prop({ default: 0 })
  currentBet: number;

  @Prop({ type: mongoose.Schema.Types.Number, ref: 'RoundState' })
  roundState: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'PokerPlayer' })
  players: PokerPlayerDocument[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PokerPlayer' })
  dealer: PokerPlayer;

  @Prop()
  dealerSeat: number;

  @Prop({
    default: null,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PokerPlayer',
  })
  smallBlind: PokerPlayer;

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'PokerPlayer',
  })
  bigBlind: PokerPlayerDocument[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PokerPlayer' })
  activePlayer: PokerPlayer;

  @Prop()
  turnEndTime: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PokerPlayer' })
  winner: PokerPlayer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PokerRoom' })
  room: PokerRoom;

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'PokerPlayer',
  })
  winners: PokerPlayerDocument[];
}

export const PokerRoundSchema = SchemaFactory.createForClass(PokerRound);
