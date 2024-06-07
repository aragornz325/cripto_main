import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { PokerPlayer } from 'src/poker-holdem/schemas/poker-player.schema';
import { User } from 'src/users/schemas/user.schema';
import { Wallet } from './wallet.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  amount: number;

  @Prop()
  balance: number;

  @Prop()
  txId: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ required: true })
  walletAddress: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true })
  wallet: Wallet;

  @Prop({ required: true })
  type: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
