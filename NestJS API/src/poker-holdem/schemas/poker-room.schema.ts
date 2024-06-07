import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { RoomState } from './room-state.schema';
import { PokerRound } from './poker-round.schema';
import { PokerPlayer } from './poker-player.schema';

export type PokerRoomDocument = PokerRoom & Document;

@Schema()
export class PokerRoom {
  @Prop()
  type: string;

  @Prop()
  entryPrice: number;

  @Prop()
  rakeValue: number;

  @Prop()
  maxPlayers: number;

  @Prop()
  availableSeats: number[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'PokerRound',
    default: [],
  })
  rounds: PokerRound[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PokerRound',
    default: null,
  })
  activeRound: PokerRound;

  @Prop({ type: mongoose.Schema.Types.Number, ref: 'RoomState', default: 1 })
  roomState: number;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'PokerPlayer',
    default: [],
  })
  players: PokerPlayer[];

  @Prop({ default: 10000 })
  startTimeout: number;

  @Prop({ default: 10000 })
  turnTimeout: number;

  @Prop()
  round: number;

  @Prop({ default: null })
  startTime: Date;
}

export const PokerRoomSchema = SchemaFactory.createForClass(PokerRoom);
